<?php
namespace User\Entity;

use Doctrine\ORM\Mapping as ORM;

use Common\Entity;

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
