<?php
/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/ZendSkeletonAdmin for the canonical source repository
 * @copyright Copyright (c) 2005-2014 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace Employer\Controller;

use Zend\View\Model\ViewModel;

use Application\Controller\AbstractActionController;

class ProjectController extends AbstractActionController
{
    protected $requiredLogin = true;

    public function indexAction()
    {
		$lang_code = $this->params()->fromRoute('lang');
		return new ViewModel(array(
			"lang_code" => $lang_code,
        ));
    }
	
}
