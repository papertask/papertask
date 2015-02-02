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
        $userData = array(
            'role' => "Admin",
            'id' => 12
        );

        $userSession = new Container('user');
        $userRole = $userSession->user_group['name'] == null ? 'Guest' : $userSession->user_group['name'];

        $userData['role'] = $userRole;
        $userData['id'] = $userSession->user_id;

        return $userData;
    }

}
