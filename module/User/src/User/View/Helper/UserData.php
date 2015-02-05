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
            'type' => "Project Manager",
            'id' => 12
        );

        $userSession = new Container('user');
        $userRole = $userSession->user_group['name'] == null ? 'Guest' : $userSession->user_group['name'];

        $userData['role'] = $userRole;
        if($userData['role'] === "Admin") $userData['type'] = $userSession->user_type;
        $userData['id'] = $userSession->user_id;

        return $userData;
    }

}
