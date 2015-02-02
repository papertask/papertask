<?php
/**
 * Created by PhpStorm.
 * User: antiprovn
 * Date: 9/28/14
 * Time: 7:23 AM
 */
namespace Api\Controller\Data;

use Zend\View\Model\JsonModel;

use Application\Controller\AbstractRestfulController;
use User\Entity\Staff;
use User\Entity\UserGroup;
use User\Entity\Language;
use User\Entity\Field;

class ProjectController extends AbstractRestfulController
{
    public function getList()
    {
        
		$config = $this->getServiceLocator()->get('Config');
		$projectTypes = $config['project_create'];
		
		$data['languages'] = $this->getAllData('\User\Entity\Language');
        //$data['clients'] = $this->getAllData('\User\Entity\Employer');
		// Get freelancer group
		$data['clients'] = $this->getAllDataBy('\User\Entity\User',['group' => UserGroup::EMPLOYER_GROUP_ID]);
		//var_dump($data['clients']);
		//$data['clients']['name'] = $data['clients']['firstName'] + ' ' + $data['clients']['lastName'];
        $data['fields'] = $this->getAllData('\User\Entity\Field');
        //$data['pms'] = $this->getAllDataBy('\User\Entity\Staff', ['type' => Staff::STAFF_TYPE_PM]);
        //$data['sales'] = $this->getAllDataBy('\User\Entity\Staff', ['type' => Staff::STAFF_TYPE_SALE]);
        $data = array_merge($data, $projectTypes);
		
		//var_dump($data );
        
		return new JsonModel($data);
    }
}