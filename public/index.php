<?php
/**
 * This makes our life easier when dealing with paths. Everything is relative
 * to the application root now.
 */
chdir(dirname(__DIR__));
define('BASE_PATH', realpath(dirname(__DIR__)));
define('PUBLIC_PATH', BASE_PATH.'/public');
// Decline static file requests back to the PHP built-in webserver
if (php_sapi_name() === 'cli-server' && is_file(__DIR__ . parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH))) {
    return false;
}

// Setup autoloading
require 'init_autoloader.php';
//$ch = curl_init();
//curl_setopt ($ch, CURLOPT_SSL_VERIFYPEER, TRUE);
//curl_setopt ($ch, CURLOPT_CAINFO, "cacert.pem");
// Run the application!
error_reporting(0);
//ini_set('display_errors', 1);
Zend\Mvc\Application::init(require 'config/application.config.php')->run();
