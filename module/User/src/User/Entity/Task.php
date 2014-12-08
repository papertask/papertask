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
    protected $is_deleted;

    /**
     * @var bool
     * @ORM\Column(type="boolean")
     */
    protected $is_completed;

    /**
     * @var bool
     * @ORM\Column(type="boolean")
     */
    protected $is_specialism_pool;

    /**
     * @var bool
     * @ORM\Column(type="boolean")
     */
    protected $is_client_pool;

    /**
     * @var \User\Entity\Freelancer
     * @ORM\ManyToOne(targetEntity="Freelancer")
     */
    protected $assignee;

    public function getData(){
        return [
            'id' => $this->id,
            'is_completed' => $this->is_completed,
            'is_deleted' => $this->is_deleted,
            'language' => $this->language->getData(),
            'project' => $this->project->getId(),
            'status' => $this->status,
            'type' => $this->type,
        ];
    }
}