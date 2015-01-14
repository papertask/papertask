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

class RatingController extends AbstractRestfulController
{
    public function getList()
    {
        $ratings = $this->getEntityManager()->getRepository('\User\Entity\Rating')
            ->findBy(array(),array('name'=>'ASC'));
        $ratings = $this->getDataList($ratings);

        return new JsonModel(['ratings' => $ratings]);
    }
}