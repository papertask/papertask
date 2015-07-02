<?php
/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link       for the canonical source repository
 * @copyright Copyright (c) 2005-2014 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace User\Controller;

use Zend\View\Model\ViewModel;
use Zend\View\Model\JsonModel;

use Application\Controller\AbstractActionController;
use User\Entity\User;
use User\Model\UserSession;
use User\Form\ForgotPasswordForm;
use User\Form\ResetForm;

class ForgotPasswordController extends AbstractActionController
{
    /**
     * @return ForgotPasswordForm
     */
    protected function getForm(){
        $form = new ForgotPasswordForm();
        return $form;
    }
    public function indexAction(){
        $translator = $this->getTranslator();
        $userSession = new UserSession();
        $form = $this->getForm();
        $request = $this->getRequest();

        if(!$userSession->isLoggedIn()){
            if($request->isPost()){
                $form->setData($request->getPost());
                if($form->isValid()){
                    $process = $form->process($this);
					if($process){
						//Email exist
                    // create message send email success
                    $this->flashMessenger()->addSuccessMessage($translator->translate('Please check your email.'));
						header("Location: http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]");
						exit;
					} else{
						// Email dont exist		
						$this->flashMessenger()->addErrorMessage($translator->translate('Your Email dont exist. Pls check again or Create a new account'));
						header("Location: http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]");
						exit;
					}
                    
                }
            }
        }

        return new ViewModel(array('form' => $form));
    }

    public function resetAction(){
        $request = $this->getRequest();
        $token = $request->getQuery()->token;
        $lang_code = $this->params()->fromRoute('lang');
        $form = new ResetForm();
        if($request->isPost()){
            $form->setData($request->getPost());
            if($form->isValid()){
            	if( $token != null){
            		$form->reset($this,$token);
            		return $this->redirect()->toUrl('/'.$lang_code."/user/login");
            	}             
            }
        }

        return new ViewModel(array('form' => $form));
    }

    public function resetpasswordAction(){
        $request = $this->getRequest();
        if($request->isPost()){
            $user = $this->getUserById((int)$request->getPost('user_id'));
            $user->setData(['password' => $request->getPost('password')]);
            $user->save($this->getEntityManager());

            return new JsonModel(['success' => true]);
        }
    }
}
