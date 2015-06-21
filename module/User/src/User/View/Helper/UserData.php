<?php
namespace User\View\Helper;
use Zend\View\Helper\AbstractHelper;
use Zend\Session\Container;

class UserData extends AbstractHelper
{
    public function __invoke()
    {
        return $this->getUserData();
    }

    private function getUserData()
    {
        $userSession = new Container('user');
        $userRole = $userSession->user_group['name'] == null ? 'Guest' : $userSession->user_group['name'];

        $userData['role'] = $userRole;
        if($userData['role'] === "Admin") $userData['type'] = $userSession->user_type;
        if($userData['role'] === "Freelancer") $userData['isSenior'] = $userSession->user_isSenior;
        $userData['id'] = $userSession->user_id;
        $userData['name'] = $userSession->name;
        if($userData['role'] === "Admin"){
        	$userData['role_name'] = 'Administrator';
        } else {
        	$userData['role_name'] = $userData['role'];
        }
		//var_dump($userData); exit;
        return $userData;
    }

}
