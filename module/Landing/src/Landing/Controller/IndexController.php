<?php
/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link       for the canonical source repository
 * @copyright Copyright (c) 2005-2014 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace Landing\Controller;

use Zend\View\Model\JsonModel;
use Zend\View\Model\ViewModel;
use Common\Mail;
use Application\Controller\AbstractActionController;

use Payum\Core\Request\GetHumanStatus;
use Zend\ServiceManager\ServiceLocator;
use Zend\ServiceManager\ServiceManagerAwareInterface;

class IndexController extends AbstractActionController
{
    public function indexAction(){
		$lang_code = $this->params()->fromRoute('lang');
		return new ViewModel(array(
            "lang_code" => $lang_code,
            ));
    }

    public function freelancerAction(){
        $lang_code = $this->params()->fromRoute('lang');
		return new ViewModel(array(
            "lang_code" => $lang_code,
            ));
    }

    public function languagesAction(){
        $lang_code = $this->params()->fromRoute('lang');
		return new ViewModel(array(
            "lang_code" => $lang_code,
            ));
    }

    public function contactAction(){
        $lang_code = $this->params()->fromRoute('lang');
		return new ViewModel(array(
            "lang_code" => $lang_code,
            ));
    }

    public function contactPostAction(){
        $data = $this->params()->fromQuery();

        $json = [
            'result' => false,
            'message' => $this->getTranslator()->translate('There is some error, please try again later.','Landing'),
            'data' => $data
        ];

        // check data
        if($data['firstName'] && $data['lastName'] && $data['email']){
            // validate email
            if(filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
                Mail::sendContactMail($this, $data);
                $json['result'] = true;
                $json['data'] = '';
                $json['message'] = $this->getTranslator()->translate('Your contact has been sent, we will contact you as soon as possible, thank you!.','Landing');
            }else{
                $json['message'] = $this->getTranslator()->translate('Your email is not correct, please input again.','Landing');
            }
        }
        return new JsonModel($json);
    }

    public function orderAction(){
    	$lang_code = $this->params()->fromRoute('lang');
    	//echo $lang_code; exit;
        return new ViewModel(array(
            "lang_code" => $lang_code,
            ));
    }
	
	public function payAction(){
		error_reporting(E_ALL);
		ini_set('display_errors', 1);
    	$lang_code = $this->params()->fromRoute('lang');
    	$storage = $this->getServiceLocator()->get('payum')->getStorage('Application\Model\PaymentDetails');
		
        $details = $storage->create();
        $details['PAYMENTREQUEST_0_CURRENCYCODE'] = 'EUR';
        $details['PAYMENTREQUEST_0_AMT'] = 1.23;
        $storage->update($details);

        $captureToken = $this->getServiceLocator()->get('payum.security.token_factory')->createCaptureToken(
            'paypal_ec', $details, 'payment_done'
        );
		//var_dump($captureToken->getTargetUrl());exit;
        $this->redirect()->toUrl($captureToken->getTargetUrl());
    }
	public function doneAction()
    {
		error_reporting(E_ALL);
		ini_set('display_errors', 1);
        $token = $this->getServiceLocator()->get('payum.security.http_request_verifier')->verify($this);

        $gateway = $this->getServiceLocator()->get('payum')->getGateway($token->getGatewayName());

        $gateway->execute($status = new GetHumanStatus($token));

        return new JsonModel(array('status' => $status->getValue()) + iterator_to_array($status->getModel()));
    }
    public function termsAction(){
        return new ViewModel();
    }

    public function privacyAction(){
        return new ViewModel();
    }
}
