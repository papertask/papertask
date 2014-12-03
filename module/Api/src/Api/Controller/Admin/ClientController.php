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

class ClientController extends AbstractRestfulJsonController
{
    public function getList(){
        $clients = $this->getAllData('\User\Entity\Employer');

        return new JsonModel(array(
            'clients' => $clients,
        ));
    }
}