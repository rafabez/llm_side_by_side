<?php
// Allow any origin to access this resource.
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Pollinations API endpoint.
$apiUrl = "https://text.pollinations.ai/";

// Get the raw POST data.
$postData = file_get_contents("php://input");

// Initialize cURL.
$ch = curl_init($apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json",
    "Content-Length: " . strlen($postData)
]);

// Execute the request.
$result = curl_exec($ch);
if($result === false) {
    // Return a JSON error if the request failed.
    $error = curl_error($ch);
    curl_close($ch);
    echo json_encode(["error" => $error]);
    exit;
}
curl_close($ch);
echo $result;
?>
