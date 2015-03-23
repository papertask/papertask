<?php
namespace Api\Controller\Admin;

use Zend\View\Model\JsonModel;

use Api\Controller\AbstractRestfulJsonController;
use User\Entity\ProjectCorrection;

class ProjectCorrectionController extends AbstractRestfulJsonController
{
    protected function clearData(&$data){
        if(isset($data['project_id'])){
            $data['project'] = $this->getReference('\User\Entity\Project', $data['project_id']);
            unset($data['project_id']);
        } else {
            throw new \Exception("No project id is set for Correction");
        }

        if(isset($data['task'])){
            $data['task'] = $this->getReference('\User\Entity\Task', $data['task']['id']);
            // unset($data['project_id']);
        } else {
            throw new \Exception("No task is set for Correction");
        }

        $data['createdDate'] = new \DateTime('NOW');
    }

    public function create($data){
        $this->clearData($data);

        $correction = new ProjectCorrection();
        $correction->setData($data);
        $correction->save($this->getEntityManager());

        return new JsonModel([
            'correction' => $correction->getData(),
        ]);
    }

    public function getList(){
        $projectId = $this->params()->fromQuery('project_id');
        $corrections = $this->getAllDataBy('\User\Entity\ProjectCorrection', [
            'project' => $projectId,
            'is_deleted' => false
        ], ['id' => 'ASC']);
        return new JsonModel([
            'corrections' => $corrections,
        ]);
    }

    public function delete($id){
        /** @var \User\Entity\Task $task */
        $correction = $this->find('\User\Entity\ProjectCorrection', $id);
        $correction->setData([
            'is_deleted' => true,
        ]);
        $correction->save($this->getEntityManager());

        return new JsonModel([
            'feedback' => $correction->getData(),
        ]);
    }

    public function update($id, $data){
        $correction = $this->find('\User\Entity\ProjectCorrection', $id);
        $this->clearData($data);
        $updateData = $data;

        $correction->setData($updateData);
        $correction->save($this->getEntityManager());

        return new JsonModel([
            'correction' => $correction->getData(),
        ]);
    }
}
