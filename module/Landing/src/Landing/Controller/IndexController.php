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
use Zend\Session\Container; 
use Common\Mail;
use Application\Controller\AbstractActionController;

use Payum\Core\Request\GetHumanStatus;
use Zend\ServiceManager\ServiceLocator;
use Zend\ServiceManager\ServiceManagerAwareInterface;
use User\Entity\Transaction;
use Alipay\AlipaySubmit;
class IndexController extends AbstractActionController
{
    public function indexAction(){
		/*error_reporting(E_ALL);
		ini_set('display_errors', 1);
		$config = new \Zend\Config\Config( include BASE_PATH.'/config/autoload/global.php' ); 
		$alipay_config['partner']		= $config->alipay->partner;
		$alipay_config['seller_email']		= $config->alipay->seller_email;
		$alipay_config['key']		= $config->alipay->key;
		$alipay_config['sign_type']		= $config->alipay->sign_type;
		$alipay_config['input_charset']		= $config->alipay->input_charset;
		$alipay_config['transport']		= $config->alipay->transport;
		$alipay_config['cacert']		= PUBLIC_PATH.'/cacert.pem';
		//require_once(BASE_PATH."/vendor/alipay/alipay_submit.class.php");
		$parameter = array(
				"service" => "create_direct_pay_by_user",
				"partner" => trim($alipay_config['partner']),
				"seller_email" => trim($alipay_config['seller_email']),
				"payment_type"	=> "1",
				"notify_url"	=> "",
				"return_url"	=> "",
				"out_trade_no"	=> "dsdsfsdfs",
				"subject"	=> "papertask",
				"total_fee"	=> 100,
				"body"	=> "dsdsds",
				"show_url"	=> "dsdsds",
				"anti_phishing_key"	=> "",
				"exter_invoke_ip"	=> "",
				"_input_charset"	=> trim(strtolower($alipay_config['input_charset']))
		);
		$alipaySubmit = new AlipaySubmit($alipay_config);
		$html_text = $alipaySubmit->buildRequestForm($parameter,"get", "确认");
		echo $html_text;
		exit;*/
		//var_dump($alipay_config);exit;
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
		//error_reporting(E_ALL);
		//ini_set('display_errors', 1);
    	$lang_code = $this->params()->fromRoute('lang');
    	$storage = $this->getServiceLocator()->get('payum')->getStorage('Application\Model\PaymentDetails');
		$total = $this->params()->fromQuery('total');
        $details = $storage->create();
		$order = new Container('order');
		
		//var_dump($order->offsetGet('total'));exit;
        $details['PAYMENTREQUEST_0_CURRENCYCODE'] = 'USD';
        $details['PAYMENTREQUEST_0_AMT'] = round($order->offsetGet('total'), 2)  ;
        $storage->update($details);

        $captureToken = $this->getServiceLocator()->get('payum.security.token_factory')->createCaptureToken(
            'paypal_ec', $details, 'payment_done'
        );
		//var_dump($captureToken->getTargetUrl());exit;
        $this->redirect()->toUrl($captureToken->getTargetUrl());
    }
	public function payAlipayAction(){
		
		$config = new \Zend\Config\Config( include BASE_PATH.'/config/autoload/global.php' ); 
		$alipay_config['partner']		= $config->alipay->partner;
		$alipay_config['seller_email']	= $config->alipay->seller_email;
		$alipay_config['key']			= $config->alipay->key;
		$alipay_config['sign_type']		= $config->alipay->sign_type;
		$alipay_config['input_charset']	= $config->alipay->input_charset;
		$alipay_config['transport']		= $config->alipay->transport;
		$alipay_config['cacert']		= PUBLIC_PATH.'/cacert.pem';
		$order = new Container('order');
		$lang_code = $this->params()->fromRoute('lang');
		$return_url = '/'.$lang_code.'/'.'landing/index/done-alipay';
		$parameter = array(
				"service" => "create_direct_pay_by_user",
				"partner" => trim($alipay_config['partner']),
				"seller_email" => trim($alipay_config['seller_email']),
				"payment_type"	=> "1",
				"notify_url"	=> "",
				"return_url"	=> $return_url,
				"out_trade_no"	=> $order->offsetGet('project_no'),
				"subject"	=> $order->offsetGet('project_no'),
				"total_fee"	=> round($order->offsetGet('total'), 2),
				"body"	=> $order->offsetGet('project_no'),
				"show_url"	=> "",
				"anti_phishing_key"	=> "",
				"exter_invoke_ip"	=> "",
				"_input_charset"	=> trim(strtolower($alipay_config['input_charset']))
		);
		$alipaySubmit = new AlipaySubmit($alipay_config);
		$html_text = $alipaySubmit->buildRequestForm($parameter,"get", "Redirecting to alipay...");
		return new ViewModel([
				//'transaction' => $transaction->getData(),
				'html_text' => $html_text,
				
			]);
		//print_r($html_text);
		//exit;
    	/*$lang_code = $this->params()->fromRoute('lang');
    	$storage = $this->getServiceLocator()->get('payum')->getStorage('Application\Model\PaymentDetails');
		$total = $this->params()->fromQuery('total');
        $details = $storage->create();
		$order = new Container('order');
        $details['PAYMENTREQUEST_0_CURRENCYCODE'] = 'USD';
        $details['PAYMENTREQUEST_0_AMT'] = round($order->offsetGet('total'), 2)  ;
        $storage->update($details);
        $captureToken = $this->getServiceLocator()->get('payum.security.token_factory')->createCaptureToken(
            'paypal_ec', $details, 'payment_done'
        );
        $this->redirect()->toUrl($captureToken->getTargetUrl());*/
    }
	public function doneAlipayAction()
    {
		//error_reporting(E_ALL);
		//ini_set('display_errors', 1);
		$is_success = $this->getRequest()->getQuery('is_success');	
		//return new JsonModel(array('status' => $status->getValue()) + iterator_to_array($status->getModel()));
		if($is_success=="T"){
			$order = new Container('order');
			//create transaction sucessfull
			$transaction = new Transaction();
			$transaction->setData([
				'intrans_no' => "",
				'fapiao_no'  => "",
				'total' => round($order->offsetGet('total'), 2),//$order->total,
				'subtotal' => round($order->offsetGet('total'), 2),//$order->total,
				'fee' => 0,
				'bank' => $this->getReference('Admin\Entity\ProfileBank', 1),
				//'bankuser' => $data["bankinfouser"],
				'is_deleted' => 0,
				'client' => $this->getReference('User\Entity\User',$order->offsetGet('client')), 
				//'freelancer' => $freelancer,
				'payDate' =>  new \DateTime('NOW'),
				'createDate' => new \DateTime('NOW'),
				'typeStatus' => 1,
				'currency' => $order->offsetGet('currency'),//$order->currency,
				'items' => ($data['items'])?$data['items']:null,
			]);
			$transaction->save($this->getEntityManager());
			//update status project to pay
			$project = $this->find('\User\Entity\Project',$order->offsetGet('project'));
			$project->setData([
				'payStatus' => 2,
			]);
			$project->save($this->getEntityManager());
			//go to sucessful page
			return new ViewModel([
				//'transaction' => $transaction->getData(),
				'success' => true,
				'total' => round($order->offsetGet('total'), 2),
				'currency' => $order->offsetGet('currency'),
				'project_no' => $order->offsetGet('project_no'),
				'project' => $order->offsetGet('project'),
			]);
		}
		else{
			//go to fail page
			return new ViewModel([
				//'transaction' => $transaction->getData(),
				'success' => false,
			]);
		}
		

       
    }
	public function doneAction()
    {
		//error_reporting(E_ALL);
		//ini_set('display_errors', 1);
        $token = $this->getServiceLocator()->get('payum.security.http_request_verifier')->verify($this);

        $gateway = $this->getServiceLocator()->get('payum')->getGateway($token->getGatewayName());
		
        $gateway->execute($status = new GetHumanStatus($token));
		
		//return new JsonModel(array('status' => $status->getValue()) + iterator_to_array($status->getModel()));
		if($status->getValue()=="captured"){
			$order = new Container('order');
			//create transaction sucessfull
			$transaction = new Transaction();
			$transaction->setData([
				'intrans_no' => "",
				'fapiao_no'  => "",
				'total' => round($order->offsetGet('total'), 2),//$order->total,
				'subtotal' => round($order->offsetGet('total'), 2),//$order->total,
				'fee' => 0,
				'bank' => $this->getReference('Admin\Entity\ProfileBank', 1),
				//'bankuser' => $data["bankinfouser"],
				'is_deleted' => 0,
				'client' => $this->getReference('User\Entity\User',$order->offsetGet('client')), 
				//'freelancer' => $freelancer,
				'payDate' =>  new \DateTime('NOW'),
				'createDate' => new \DateTime('NOW'),
				'typeStatus' => 1,
				'currency' => $order->offsetGet('currency'),//$order->currency,
				'items' => ($data['items'])?$data['items']:null,
			]);
			$transaction->save($this->getEntityManager());
			//update status project to pay
			$project = $this->find('\User\Entity\Project',$order->offsetGet('project'));
			$project->setData([
				'payStatus' => 2,
			]);
			$project->save($this->getEntityManager());
			//go to sucessful page
			return new ViewModel([
				//'transaction' => $transaction->getData(),
				'success' => true,
				'total' => round($order->offsetGet('total'), 2),
				'currency' => $order->offsetGet('currency'),
				'project_no' => $order->offsetGet('project_no'),
				'project' => $order->offsetGet('project'),
			]);
		}
		else{
			//go to fail page
			return new ViewModel([
				//'transaction' => $transaction->getData(),
				'success' => false,
			]);
		}
		

       
    }
    public function termsAction(){
        return new ViewModel();
    }

    public function privacyAction(){
        return new ViewModel();
    }
}
