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

        return new ViewModel(array('form' => $form));
    }
}
