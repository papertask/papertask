<?php
/**
 * Created by PhpStorm.
 * User: antiprovn
 * Date: 10/6/14
 * Time: 9:59 AM
 */

namespace User\Entity;

use Doctrine\ORM\Mapping as ORM;

use Common\Entity;

/** @ORM\Entity */
class Itermdtpmac extends Entity{

    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */
    protected $id;

	/**
     * @var \User\Entity\Project
     * @ORM\ManyToOne(targetEntity="Project")
     * @ORM\JoinColumn(name="project_id", referencedColumnName="id", nullable=true)
     */
    protected $project;

	/** @ORM\Column(type="string") */
    protected $name;
    /**
     * @var \User\Entity\File
     * @ORM\ManyToOne(targetEntity="File")
     */
    protected $file;
    /**
     * @var \User\Entity\Language
     * @ORM\ManyToOne(targetEntity="Language")
     */
    protected $language;

    /**
     * @var integer
     * @ORM\Column(type="integer")
     */
    protected $quantity;

    /**
     * @var integer
     * @ORM\Column(type="integer", nullable=true)
     */
    protected $unit;

	/**
     * @var \User\Entity\DesktopSoftware
     * @ORM\ManyToOne(targetEntity="DesktopSoftware")
     */

    protected $software;
	/**
     * @var decimal
     * @ORM\Column(type="decimal", scale=3, precision=6)
     */
    protected $rate = 0.00;

	/**
     * @var decimal
     * @ORM\Column(type="decimal", scale=3, precision=6)
     */
    protected $rate_freelancer = 0.00;
	  /**
     * @var float
     * @ORM\Column(type="decimal", scale=3, precision=15)
     */
    protected $total = 0.00;
	  /**
     * @var float
     * @ORM\Column(type="decimal", scale=3, precision=15)
     */
    protected $total_freelancer = 0.00;
	/**
     * @var integer
     * @ORM\Column(type="integer")
     */
    protected $of_freelancer=0;
    /**
       * @var \User\Entity\Task
       * @ORM\ManyToOne(targetEntity="Task")
       * @ORM\JoinColumn(name="task_id", referencedColumnName="id", nullable=true)
       */

      protected $task;
      public function setProject($project){
          $this->project = $project;
      }
  	public function setTask($task){
          $this->task = $task;
      }
	 public function getProject(){
        return $this->project;
    }


    public function getTotal(){
          return $this->total;
      }
  	public function getTotalFreelancer(){
          return $this->total_freelancer;
      }
	public function getData(){
        return [
			'id' => $this->id,
            'name' => $this->name,
            'file' => ($this->file)?$this->file->getData():null,
			'language' => $this->language->getData(),
			'rate' => $this->rate,
			'rate_freelancer' => $this->rate_freelancer,
			'quantity' => $this->quantity,
            'unit' => $this->unit,
			'software' => ($this->software)?$this->software->getData():null,
			'total' => $this->total,
			'total_freelancer' => $this->total_freelancer,
			'of_freelancer' => $this->of_freelancer
        ];
    }
}
