// ==UserScript==
// @name         Cookie Clicker Auto Backup Save
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatically backs up your save to a PHP webserver of your choice
// @author       Mentosmenno2
// @match        https://orteil.dashnet.org/cookieclicker/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    const SAVE_INTERVAL_MINUTES = 5;
    const PHP_SCRIPT_URL = 'https://example.com/cookie-clicker-auto-backup-save/save.php';
    const AUTH_TOKEN = 'xxxxxxxxxx';

    function uploadSave(save) {
        console.log('[Auto Backup Save] Uploading save:' + Game.bakeryName);
        GM_xmlhttpRequest({
            method: "POST",
            url: PHP_SCRIPT_URL,
            data: JSON.stringify({ saveName: Game.bakeryName, content: save }),
            headers: {
                "Content-Type": "application/json",
                "X-Auth": AUTH_TOKEN
            },
            onload: function(response) {
                console.log("[✓] Uploading save success:", response.responseText);
                Game.Notify('[Auto Backup Save] ' + response.responseText,'','',3,1);
            },
            onerror: function(err) {
                console.error("[!] Uploading save failed:", err);
                Game.Notify('[Auto Backup Save] ' + err,'','',3,1);
            }
        });
    }

    function exportSave() {
        try {
            const save = window.localStorage.getItem(Game.SaveTo);
            if (save) {
                console.log('[Auto Backup Save] Save found.');
                uploadSave(save);
            } else {
                console.warn('[Auto Backup Save] No save found.');
            }
        } catch (e) {
            console.error('[Auto Backup Save] Error exporting save:', e);
        }
    }

    setInterval(exportSave, SAVE_INTERVAL_MINUTES * 60 * 1000);
    console.log('[Auto Backup Save] Script started. Every ' + SAVE_INTERVAL_MINUTES + ' minutes the save will be exported.');
})();