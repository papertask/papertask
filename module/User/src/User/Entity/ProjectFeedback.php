<?php
namespace User\Entity;

use Doctrine\ORM\Mapping as ORM;

use Common\Entity;
use Common\Mail;

/** @ORM\Entity */
class ProjectFeedback extends Entity{

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
    protected $createdDate;

    /**
     * @var \User\Entity\Project
     * @ORM\ManyToOne(targetEntity="Project")
     */
    protected $project;

    /**
     * @var \User\Entity\Language
     * @ORM\ManyToOne(targetEntity="Language")
     */
    protected $targetLanguage;

    /** @ORM\Column(type="integer") */
    protected $quality;

    /** @ORM\Column(type="integer") */
    protected $turnAroundTime;

    /** @ORM\Column(type="string", nullable=true) */
    protected $message = null;

    /**
     * @var bool
     * @ORM\Column(type="boolean")
     */
    protected $is_deleted = false;

    public function getData(){
        return [
            'id' => $this->id,
            'createdDate' => $this->createdDate,
            'project' => $this->project->getId(),
            'language' => $this->targetLanguage->getData(),
            'quality' => $this->quality,
            'turnAroundTime' => $this->turnAroundTime,
            'message' => $this->message,
        ];
    }
}
