<?php
/**
 * Global Configuration Override
 *
 * You can use this file for overriding configuration values from modules, etc.
 * You would place values in here that are agnostic to the environment and not
 * sensitive to security.
 *
 * @NOTE: In practice, this file will typically be INCLUDED in your source
 * control, so do not include passwords or other sensitive information in this
 * file.
 */

use Buzz\Client\Curl;
use Payum\Core\Extension\StorageExtension;
use Payum\Core\Storage\FilesystemStorage;
use Payum\Paypal\ExpressCheckout\Nvp\Api;
use Payum\Paypal\ExpressCheckout\Nvp\GatewayFactory;

$detailsClass = 'Application\Model\PaymentDetails';

$paypalFactory = new \Payum\Paypal\ExpressCheckout\Nvp\PaypalExpressCheckoutGatewayFactory();

return array(
    'payum' => array(
        'token_storage' => new FilesystemStorage(
            __DIR__.'/../../data',
            'Application\Model\PaymentSecurityToken',
            'hash'
        ),
        'gateways' => array(
            'paypal_ec' => $paypalFactory->create(array(
                'username' => 'EDIT ME',
                'password' => 'EDIT ME',
                'signature' => 'EDIT ME',
                'sandbox' => true
            )),
        ),
        'storages' => array(
            $detailsClass => new FilesystemStorage(__DIR__.'/../../data', $detailsClass, 'id'),
        )
    ),
	'alipay' => array(
		'partner'		=> '2088511498110839',
		'seller_email'	=> 'payment@papertask.com',
		'key'			=> 'i1oobu86ib38lgzzvxov13afkou7yifo',
		'sign_type'    	=> strtoupper('MD5'),
		'input_charset'	=> strtolower('utf-8'),
		//'cacert'    	=> getcwd().'\\cacert.pem',
		'transport'   	=> 'http'
    ),
);
