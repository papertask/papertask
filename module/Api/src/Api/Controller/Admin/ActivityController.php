<?php
namespace Api\Controller\Admin;

use Zend\View\Model\JsonModel;

use Api\Controller\AbstractRestfulJsonController;
use User\Entity\Activity;

class ActivityController extends AbstractRestfulJsonController
{
    protected function clearData(&$data){
        if(isset($data['project_id'])){
            $data['project'] = $this->getReference('\User\Entity\Project', $data['project_id']);
            unset($data['project_id']);
        } else {
            throw new \Exception("No project id is set for Activity");
        }

        if(isset($data['sender_id'])){
            $data['sender'] = $this->getReference('\User\Entity\User', $data['sender_id']);
            unset($data['sender_id']);
        } else {
            $data['sender'] = $this->getCurrentUser();
        }

        if(!isset($data['type'])){
            $data['type'] = "message";
        }

        $data['activityDate'] = new \DateTime('NOW');
    }

    public function create($data){
        $this->clearData($data);

        $activity = new Activity();
        $activity->setData($data);
        $activity->save($this->getEntityManager());

        $activity->sendNewActivityMail($this);

        return new JsonModel([
            'activity' => $activity->getData(),
        ]);
    }

    public function getList(){
        $projectId = $this->params()->fromQuery('project_id');
        $activities = $this->getAllDataBy('\User\Entity\Activity', [
            'project' => $projectId,
            'is_deleted' => false
        ], ['id' => 'ASC']);
        return new JsonModel([
            'activities' => $activities,
        ]);
    }

    public function delete($id){
        /** @var \User\Entity\Task $task */
        $activity = $this->find('\User\Entity\Activity', $id);
        $activity->setData([
            'is_deleted' => true,
        ]);
        $task->save($this->getEntityManager());

        return new JsonModel([
            'activity' => $activity->getData(),
        ]);
    }

    public function update($id, $data){
        $activity = $this->find('\User\Entity\Activity', $id);
        $updateData = [];

        $activity->setData($updateData);
        $activity->save($this->getEntityManager());

        return new JsonModel([
            'activity' => $activity->getData(),
        ]);
    }
}
