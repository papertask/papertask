<?php
namespace Api\Controller\Admin;

use Zend\View\Model\JsonModel;

use Api\Controller\AbstractRestfulJsonController;
use User\Entity\ProjectFeedback;

class ProjectFeedbackController extends AbstractRestfulJsonController
{
    protected function clearData(&$data){
        if(isset($data['project_id'])){
            $data['project'] = $this->getReference('\User\Entity\Project', $data['project_id']);
            unset($data['project_id']);
        } else {
            throw new \Exception("No project id is set for Feedback");
        }

        /**
         * Need to set smth. as subject of Feedback
         */

        if(isset($data['language'])){
            $data['targetLanguage'] = $this->getReference('\User\Entity\Language', $data['language']['id']);
            unset($data['language']);
        } else {
             throw new \Exception("No language is set for Feedback");
        }

        // if(isset($data['task'])){
        //     $data['task'] = $this->getReference('\User\Entity\Task', $data['task']['id']);
        //     // unset($data['project_id']);
        // } else {
        //     throw new \Exception("No task is set for Feedback");
        // }

        $data['createdDate'] = new \DateTime('NOW');
    }

    public function create($data){
        $this->clearData($data);
        $entityManager = $this->getEntityManager();
        
        $project =  $data['project'];
        $project->setData(['status'=> 5,]);
        $project->save($entityManager);
        
        $task = $entityManager->getRepository('User\Entity\Task')->findOneBy(array('project'=>$project,'language' => $data['language_data']));
        $task->setData(['status'=> 1,]);
        $task->save($entityManager);

        $feedback = new ProjectFeedback();
        $feedback->setData($data);
        $feedback->save($this->getEntityManager());

        return new JsonModel([
            'feedback' => $feedback->getData(),
        ]);
    }

    public function getList(){
        $projectId = $this->params()->fromQuery('project_id');
        $feedbacks = $this->getAllDataBy('\User\Entity\ProjectFeedback', [
            'project' => $projectId,
            'is_deleted' => false
        ], ['id' => 'ASC']);
        return new JsonModel([
            'feedbacks' => $feedbacks,
        ]);
    }

    public function delete($id){
        /** @var \User\Entity\Task $task */
        $feedback = $this->find('\User\Entity\ProjectFeedback', $id);
        $feedback->setData([
            'is_deleted' => true,
        ]);
        $feedback->save($this->getEntityManager());

        return new JsonModel([
            'feedback' => $feedback->getData(),
        ]);
    }

    public function update($id, $data){
        $feedback = $this->find('\User\Entity\ProjectFeedback', $id);
        $entityManager = $this->getEntityManager();
        $this->clearData($data);
        $updateData = $data;

        $feedback->setData($updateData);
        $feedback->save($this->getEntityManager());

        $project =  $data['project'];
        $project->setData(['status'=> 5,]);
        $project->save($entityManager);
        
        $task = $entityManager->getRepository('User\Entity\Task')->findOneBy(array('project'=>$project,'language' => $data['language_data']));
        $task->setData(['status'=> 1,]);
        $task->save($entityManager);

        return new JsonModel([
            'feedback' => $feedback->getData(),
        ]);
    }
}
