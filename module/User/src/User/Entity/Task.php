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

    public function getData(){
        return [
            'id' => $this->id,
            'is_completed' => $this->is_completed,
            'is_client_pool' => $this->is_client_pool,
            'is_deleted' => $this->is_deleted,
            'is_specialism_pool' => $this->is_specialism_pool,
            'language' => $this->language->getData(),
            'project' => $this->project->getId(),
            'status' => $this->status,
            'type' => $this->type,
        ];
    }
}