/** @module api/news */
import express from 'express';
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { asyncDatabaseRead, asyncDatabaseWrite } from '../utils/asyncDatabase.js';
import { wrapInTable } from '../utils/tableWrapper.js';

const newsAPI = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const databasePath = path.join(__dirname, "../../assets/databases/news.db");

function renameArticleType(entryType) {
    return entryType == 0 ? "Article" : "Tweet";
}

function unixTimeToHumanreadableTime(unixTime) {
    return (new Date(unixTime).toLocaleString());
}

function generateActionButtons(target) {
    return `<button class='delete-button' hx-delete='/api/news?target=${target}'>Delete</button><a href='/update-news.html?target=${target}'><button class='edit-button' hx-confirm='unset'>Edit</button></a>`;
}

function modifyOrAppendProperty(targetObject, key, value) {
    return { ...targetObject, [key]: value };
}

/**
 * Get single news entry specified by Un*x Timestamp
 * @param {Object} request
 * @param {number} request.query.target - Un*x Timestamp to specify news entry
 * @param {Object} response
 * @returns {JSON} news entry data
 * @example
 * $ curl -X GET http://localhost:3001/api/news?target=0
 * // gets news posted on Un*x epoch in JSON format
 */
const getNewsEntry = async (request, response) => {
    const database = new sqlite3.Database(databasePath);

    const target = Number(request.query.target);

    if (isNaN(target)) {
        console.error("Query is not number");
        response.status(500).send("Query is not number");
        return;
    }

    const sqlQuery = `SELECT * FROM news WHERE date = ${target}`;

    try {
        const result = await asyncDatabaseRead(database, sqlQuery, (rows) => { return rows[0] });
        database.close();
        response.send(result);
    } catch (err) {
        console.error(err);
        database.close();
    }
}
newsAPI.get('/', getNewsEntry);

/**
 * Post news and write to database
 * @param {Object} request
 * @param {number} request.body.entryType - Number that represents type of news (0: article, 1: tweet)
 * @param {string} request.body.cardContent - Content of news card, Markdown is allowed
 * @param {string} request.body.article - Article written in Markdown
 * @param {string} request.body.linkPath - Relative URL path to the article
 * @param {string} request.body.coverImagePath - Relative URL path to the cover image
 * @param {Object} response
 * @returns result is logged into console
 * @example
 * $ curl -X POST \
 *       -H 'Content-Type: application/x-www-form-urlencoded' \
 *       --data-raw 'entryType=1&cardContent=Test&article=&linkPath=&coverImagePath=/default.png' \
 *       http://localhost:3001/api/news
 * // Posts Tweet style news with content "Test" and cover image "/default.png"
 */
const postNewsEntry = async (request, response) => {
    const database = new sqlite3.Database(databasePath);

    const currentDate = new Date();
    const currentUnixTime = currentDate.valueOf();
    const entryType = request.body.entryType;
    const cardContent = request.body.cardContent;
    const article = request.body.article;
    const linkPath = entryType == 0 ? `/news/${request.body.linkPath}` : "";
    const coverImagePath = request.body.coverImagePath;

    const sqlQuery = `INSERT INTO news (date, entryType, cardContent, article, linkPath, coverImagePath) VALUES (${currentUnixTime}, ${entryType}, "${cardContent}", "${article}", "${linkPath}", "${coverImagePath}");`;

    try {
        await asyncDatabaseWrite(database, sqlQuery, () => {
            console.log("News added successfully.");
        });
    } catch (err) {
        console.error(err);
        response.status(500).send(err);
    }
    database.close();
    response.end();
};
newsAPI.post('/', postNewsEntry);

/**
 * Update news entry
 * @param {Object} request
 * @param {number} request.body.target - Un*x timestamp to identify the entry
 * @param {number} request.body.entryType - Number that represents type of news (0: article, 1: tweet)
 * @param {string} request.body.cardContent - Content of news card, Markdown is allowed
 * @param {string} request.body.article - Article written in Markdown
 * @param {string} request.body.linkPath - Relative URL path to the article
 * @param {string} request.body.coverImagePath - Relative URL path to the cover image
 * @param {Object} response
 * @returns result is logged into console
 * @example
 * $ curl -X PUT \
 *       -H 'Content-Type: application/x-www-form-urlencoded' \
 *       --data-raw 'target=0&entryType=1&cardContent=Test&article=&linkPath=&coverImagePath=default.png' \
 *       http://localhost:3001/api/news
 * // Update news posted on Un*x Epoch with given contents
 */
const putNewsEntry = async (request, response) => {
    const database = new sqlite3.Database(databasePath);

    const target = Number(request.body.target);
    const entryType = Number(request.body.entryType);
    const cardContent = request.body.cardContent;
    const article = request.body.article;
    const linkPath = entryType == 0 ? `/news/${request.body.linkPath}` : "";
    const coverImagePath = request.body.coverImagePath;

    if (isNaN(target)) {
        console.error('Target is not number');
        response.status(500).send('Target is not number');
        return;
    }

    const sqlQuery = `UPDATE news SET entryType = ${entryType}, cardContent = "${cardContent}", article = "${article}", linkPath = "${linkPath}", coverImagePath = "${coverImagePath}" WHERE date = ${target};`;

    try {
        await asyncDatabaseWrite(database, sqlQuery, () => {
            console.log("News updated successfully.");
        });
    } catch (err) {
        console.error(err);
        response.status(500).send(err);
    }

    database.close();
    response.end();
};
newsAPI.put('/', putNewsEntry);

/**
 * Delete news specified by Un*x Timestamp
 * @param {Object} request
 * @param {number} request.query.target - Un*x timestamp to identify the entry
 * @param {Object} response
 * @returns result is logged into console
 * @example
 * $ curl -X DELETE \
 *       http://localhost:3001/api/news?target=0
 * // Delete news posted on Un*x Epoch
 */
const deleteNewsEntry = async (request, response) => {
    const database = new sqlite3.Database(databasePath);

    const target = Number(request.query.target);

    if (isNaN(target)) {
        console.error('No Entry Found!');
        response.status(404).send('No Entry Found!');
        return;
    }

    const sqlQuery = `DELETE FROM news WHERE date = ${target}`;

    try {
        await asyncDatabaseWrite(database, sqlQuery, () => {
            console.log("News deleted successfully.");
        });
    } catch (err) {
        console.error(err);
        response.status(500).send(err);
    }

    database.close();

    response.status(200).send();
};
newsAPI.delete('/', deleteNewsEntry);

/**
 * Get news list in HTML table body tr+td
 * @param {Object} request
 * @param {Object} response
 * @returns {string} HTML table body tr+td
 * @example
 * $ curl -X GET \
 *       http://localhost:3001/api/news/list
 * // <tr>
 * //     <td>1</td>
 * //     <td>1970/1/1 0:0:0</td>
 * //     ...
 * // </tr>
 * // ...
 */
const getNewsList = async (request, response) => {
    const database = new sqlite3.Database(databasePath);
    const sqlQuery = `SELECT id, date, entryType, cardContent FROM news ORDER BY date DESC;`;
    try {
        const result = await asyncDatabaseRead(database, sqlQuery, (rows) => {
            let ret = "";
            const rowsCopy = [...rows];
            const rowsWithButtons = rowsCopy.map((entry) => {
                const appendButtons = (value) => modifyOrAppendProperty(entry, "buttons", value);
                return appendButtons(generateActionButtons(entry.date));
            });
            const renamedArticleTypeRows = rowsWithButtons.map((entry) => {
                const modifyEntryType = (value) => modifyOrAppendProperty(entry, "entryType", value);
                return modifyEntryType(renameArticleType(entry.entryType));
            });
            const convertedTimeRows = renamedArticleTypeRows.map((entry) => {
                const modifyDate = (value) => modifyOrAppendProperty(entry, "date", value);
                return modifyDate(unixTimeToHumanreadableTime(entry.date));
            });
            ret = wrapInTable(convertedTimeRows);
            return ret;
        });
        database.close();
        response.send(result);
    } catch (err) {
        console.error(err);
        database.close();
    }
};
newsAPI.get('/list', getNewsList);

/**
 * Get news list in unformated raw JSON string
 * @param {Object} request
 * @param {Object} response
 * @returns {JSON} Unformatted JSON string that contains news entries
 * @example
 * $ curl -X GET \
 *       http://localhost:3001/api/news/list-unwrapped
 * // gets raw JSON containing news entries
 */
const getNewsListUnrwapped = async (request, response) => {
    const database = new sqlite3.Database(databasePath);
    const sqlQuery = `SELECT id, date, entryType, cardContent FROM news ORDER BY date DESC;`;

    try {
        const result = await asyncDatabaseRead(database, sqlQuery, (rows) => { return rows; });

        database.close();
        response.send(result);
    } catch (err) {
        console.error(err);
        database.close();
    }
};
newsAPI.get('/list-unwrapped', getNewsListUnrwapped);

export default newsAPI;
