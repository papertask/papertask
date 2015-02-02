<?php
namespace Admin\Controller;

use Zend\View\Model\ViewModel;

use User\Entity\User;
use User\Model\UserSession;
use Admin\Form\ResetPasswordForm;

use Application\Controller\AbstractActionController;


class ResetPasswordController extends AbstractActionController
{
    protected $requiredLogin = true;

    public function indexAction()
    {
        $request = $this->getRequest();
        $form = new ResetPasswordForm();
        //if($request->isPost()){
            // $form->setData($request->getPost());
            // if($form->isValid()){
            //     $form->reset($this);
            // }
        //}
        //var_dump($request);
        return new ViewModel(array('form' => $form));
        //return "hehehe";
    }

    public function resetpasswordAction(){
        var_dump("Im here!");
        $request = $this->getRequest();
        if($request->isPost()){
            $user = $this->getUserById((int)$request->getPost('user_id'));
            $user->setData(['password' => $request->getPost('password')]);
            $user->save($this->getEntityManager());

            return new JsonModel(['success' => true]);
        }
    }
}
