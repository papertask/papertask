<?php
/**
 * Created by PhpStorm.
 * User: antiprovn
 * Date: 9/28/14
 * Time: 11:50 AM
 */

namespace User\Entity;

use Doctrine\ORM\Mapping as ORM;

use Common\Entity;

/** @ORM\Entity */
class Task extends Entity{

    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */
    protected $id;
	
	/** @ORM\Column(type="string") */
    protected $name;
    
    
	/**
     * @var \User\Entity\Project
     * @ORM\ManyToOne(targetEntity="Project")
     */
    protected $project;

    /**
     * @var \User\Entity\Language
     * @ORM\ManyToOne(targetEntity="Language")
     */
    protected $language;

    /**
     * @var integer
     * @ORM\Column(type="integer")
     */
    protected $type;

    /**
     * @var integer
     * @ORM\Column(type="integer")
     */
    protected $status;

    /**
     * @var bool
     * @ORM\Column(type="boolean")
     */
    protected $is_deleted = false;

    /**
     * @var bool
     * @ORM\Column(type="boolean")
     */
    protected $is_completed = false;

    /**
     * @var bool
     * @ORM\Column(type="boolean")
     */
    protected $is_specialism_pool = false;

    /**
     * @var bool
     * @ORM\Column(type="boolean")
     */
    protected $is_client_pool = false;

    /**
     * @var \User\Entity\Freelancer
     * @ORM\ManyToOne(targetEntity="Freelancer")
     */
    protected $assignee;
	/**
     * @var string
     * @ORM\Column(type="datetime")
     */
    protected $startDate;

    /**
     * @var string
     * @ORM\Column(type="datetime")
     */
    protected $dueDate;
	/**
     * @var int
     * @ORM\Column(type="integer",options={"default" = 1})
     */
    protected $payStatus = 1;
	/**
     * @var float
     * @ORM\Column(type="decimal", scale=2, precision=6)
     */
    protected $total = 0.00;

    /**
     * @var string
     * @ORM\Column(type="string")
     */
    protected $task_number;

    public function getData(){
        return [
            'id' => $this->id,
			'name' => $this->name,
            'is_completed' => $this->is_completed,
            'is_client_pool' => $this->is_client_pool,
            'is_deleted' => $this->is_deleted,
            'is_specialism_pool' => $this->is_specialism_pool,
            'language' => $this->language->getData(),
            'project' => $this->project->getId(),
            'status' => $this->status,
            'type' => $this->type,
			'dueDate' => $this->dueDate,
			'startDate' => $this->startDate,
			'total' => $this->total,
			'assignee' => ($this->assignee)?$this->assignee->getData():null,
			'task_number' => $this->task_number,
        ];
    }
    
    public function setStatus( $status )
    {
    	$this->status = $status;
    	//return $this;
    }
    
    public function setAssignee( $assignee )
    {
    	$this->assignee = $assignee;
    	//return $this;
    }
    
    public function getProject()
    {
    	return $this->project;
    	//return $this;
    }
    
    public function getTaskNumber()
    {
    	return $this->task_number;
    	//return $this;
    }
}