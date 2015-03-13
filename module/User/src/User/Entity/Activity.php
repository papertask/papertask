<?php
namespace User\Entity;

use Doctrine\ORM\Mapping as ORM;

use Common\Entity;
use Common\Mail;

/** @ORM\Entity */
class Activity extends Entity{

    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */
    protected $id;

    /**
     * @var string
     * @ORM\Column(type="datetime")
     */
    protected $activityDate;

    /**
     * @var \User\Entity\Project
     * @ORM\ManyToOne(targetEntity="Project")
     */
    protected $project;

    /**
     * @var \User\Entity\Task
     * @ORM\ManyToOne(targetEntity="Task")
     */
    protected $task;

    /**
     * @var string
     * @ORM\Column(type="string")
     */
    protected $type;

    /**
     * @var \User\Entity\User
     * @ORM\ManyToOne(targetEntity="User")
     */
    protected $sender;

    /** @ORM\Column(type="string", nullable=true) */
    protected $message = null;

    /**
     * @var bool
     * @ORM\Column(type="boolean")
     */
    protected $is_deleted = false;

    /**
     * @param \Application\Controller\AbstractActionController $controller
     */
    public function sendNewActivityMail($controller){
        // initial data for email template
        $lang_code = $controller->params()->fromRoute('lang');

        $projectLink = $controller->getBaseUrl(). $lang_code . '/admin/project/detail?id=' . $this->project->getId();

        $data = array(
            'project' => $this->project->getData(),
            'type' => $this->type,
            'sender' => $this->sender->getData(),
            'message' => $this->message,
            'projectLink' => $projectLink,
        );

        $emails = [];
        $emails[] = $controller->getUser(array("staff" => $this->project->getData()['pm']['id']))->getData()['email'];
        $emails[] = $controller->getUser(array("employer" => $this->project->getData()['client']['id']))->getData()['email'];

        if($this->project->getData()['sale']){
            $emails[] = $controller->getUser(array("staff" => $this->project->getData()['sale']['id']))->getData()['email'];
        }

        // Uncomment to remove current user from mail list to send
        // $user = $controller->getCurrentUser();
        // if(($key = array_search($user->getEmail(), $emails)) !== false) {
        //     unset($emails[$key]);
        // }

        foreach ($emails as $email) {
            Mail::sendMail($controller, "ACTIVITY_NEW", $email, $data);
        }
    }

    public function getData(){
        return [
            'id' => $this->id,
            'activityDate' => $this->activityDate,
            'project' => $this->project->getId(),
            'task' => $this->task ? $this->task->getData()['id'] : null,
            'type' => $this->type,
            'sender' => $this->sender->getData(),
            'message' => $this->message,
        ];
    }
}
