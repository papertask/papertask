<?php
namespace Api\Controller\Admin;

use Zend\View\Model\JsonModel;
use Zend\Paginator\Paginator;

use DoctrineORMModule\Paginator\Adapter\DoctrinePaginator as DoctrineAdapter;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;

use Admin\Model\Helper;
use Api\Controller\AbstractRestfulJsonController;
use User\Entity\Iterm;
use User\Entity\Project;
use User\Entity\UserGroup;

class FieldController extends AbstractRestfulJsonController
{
    public function getList(){
        $fields = $this->getAllData('\User\Entity\Field');

        return new JsonModel(array(
            'fields' => $fields,
        ));
    }
}