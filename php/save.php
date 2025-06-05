<?php

define( 'SAVE_DIRECTORY', __DIR__ . DIRECTORY_SEPARATOR . 'saves' );
define( 'AUTH_TOKEN', 'xxxxxxxxxx' );

// Validate auth
$authHeader = $_SERVER['HTTP_X_AUTH'] ?? '';
if ($authHeader !== AUTH_TOKEN) {
    http_response_code(403);
    echo 'Invalid token';
    exit;
}

// Check for POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo 'Only POST allowed';
    exit;
}

// Read JSON input
$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['content'])) {
    http_response_code(400);
    echo 'No content';
    exit;
}

if (!isset($input['saveName'])) {
    http_response_code(400);
    echo 'No save name';
    exit;
}


$filename = $input['saveName'] . '.txt';

// Make path
$filepath = realpath(SAVE_DIRECTORY) . DIRECTORY_SEPARATOR . $filename;

// Schrijf bestand
if (file_put_contents($filepath, $input['content']) !== false) {
    echo "Saved as: $filename";
} else {
    http_response_code(500);
    echo 'Error saving';
}