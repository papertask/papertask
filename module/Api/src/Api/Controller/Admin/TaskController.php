<?php
namespace Api\Controller\Admin;

use Zend\View\Model\JsonModel;

use Api\Controller\AbstractRestfulJsonController;
use User\Entity\Task;
use User\Entity\Activity;

class TaskController extends AbstractRestfulJsonController
{
    protected function clearData(&$data){
        if(isset($data['type'])){
            $data['type'] = $data['type']['id'];
        }
        if(isset($data['language'])){
            $data['language'] = $this->getReference('\User\Entity\Language', $data['language']['id']);
        }
        if(isset($data['project_id'])){
            $data['project'] = $this->getReference('\User\Entity\Project', $data['project_id']);
            unset($data['project_id']);
        }
        if(isset($data['status'])){
            $data['status'] = $data['status']['id'];
        }
    }

    public function create($data){
        $this->clearData($data);

        $task = new Task();
        $task->setData($data);
        $task->save($this->getEntityManager());

        $activity = new Activity();
        $activity->setData([
            'activityDate' => new \DateTime('NOW'),
            'project' => $data['project'],
            'task' => $task,
            'type' => "create_task",
            'sender' => $this->getCurrentUser()
        ]);
        $activity->save($this->getEntityManager());

        return new JsonModel([
            'task' => $task->getData(),
        ]);
    }

    public function getList(){
        $projectId = $this->params()->fromQuery('project_id');
        $tasks = $this->getAllDataBy('\User\Entity\Task', [
            'is_deleted' => false,
            'project' => $projectId
        ], ['id' => 'ASC']);
        return new JsonModel([
            'tasks' => $tasks,
        ]);
    }

    public function delete($id){
        /** @var \User\Entity\Task $task */
        $task = $this->find('\User\Entity\Task', $id);
        $task->setData([
            'is_deleted' => true,
        ]);
        $task->save($this->getEntityManager());

        return new JsonModel([
            'task' => $task->getData(),
        ]);
    }

    public function update($id, $data){
        $task = $this->find('\User\Entity\Task', $id);
        $updateData = [];
        if(isset($data['is_specialism_pool'])){
            $updateData['is_specialism_pool'] = (bool) $data['is_specialism_pool'];
            $updateData['is_client_pool'] = !$updateData['is_specialism_pool'];
        } else if (isset($data['is_client_pool'])){
            $updateData['is_client_pool'] = (bool) $data['is_client_pool'];
            $updateData['is_specialism_pool'] = !$updateData['is_client_pool'];
        }
        $task->setData($updateData);
        $task->save($this->getEntityManager());

        return new JsonModel([
            'task' => $task->getData(),
        ]);
    }
}