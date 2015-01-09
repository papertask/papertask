<?php
/**
 * Created by PhpStorm.
 * User: antiprovn
 * Date: 9/27/14
 * Time: 9:19 PM
 */
namespace Api\Controller\User;

use Zend\View\Model\JsonModel;

use Application\Controller\AbstractRestfulController;
use Admin\Model\Helper;
use User\Entity\CvFile;

class CvFilesController extends AbstractRestfulController
{
    public function get($id){
        $user = $this->getUserById($id);
        $cvFile = $this->getEntityManager()->getRepository('\User\Entity\CvFile')->findBy(['user' => $user]);
        $cvFiles = array();
        foreach ( $cvFile as $k=>$v ) {
            $cvFiles[$k] = $v->getData();
        }
        return new JsonModel([
            'cvfiles' => $cvFiles,
        ]);
    }
    
    public function delete( $id ) 
    {
        $entityManager = $this->getEneityManager( );
        $cvFile = $entityManager->getRepository('\User\Entity\CvFile')->find($id);
        $entityManager->remove( $cvFile );
        $entityManager->flush();

        return new JsonModel([]);
    }
    
    public function update( $id, $data ) 
    {
        $entityManager = $this->getEntityManager();
        $user = $entityManager->getRepository('\User\Entity\User')->find($id);
        $cvFile = $entityManager->getRepository('\User\Entity\CvFile')->find($data[0]['id']);
        $cvFile->setUser( $user );
        $cvFile->save($entityManager);
        return new JsonModel([]);
    }
}