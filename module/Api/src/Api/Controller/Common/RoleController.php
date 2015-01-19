<?php
/**
 * Created by PhpStorm.
 * User: antiprovn
 * Date: 9/28/14
 * Time: 7:23 AM
 */
namespace Api\Controller\Common;

use Zend\View\Model\JsonModel;

use Application\Controller\AbstractRestfulController;

class RoleController extends AbstractRestfulController
{
    public function getList()
    {
        $roles = $this->getEntityManager()->getRepository('\User\Entity\Roles')
            ->findBy(array(),array('id'=>'ASC'));
        $roles = $this->getDataList($roles);

        return new JsonModel(['roles' => $roles]);
    }
}