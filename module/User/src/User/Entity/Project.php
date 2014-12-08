<?php
/**
 * Created by PhpStorm.
 * User: antiprovn
 * Date: 10/6/14
 * Time: 8:42 AM
 */

namespace User\Entity;

use Doctrine\ORM\Mapping as ORM;
use Common\Entity;


/** @ORM\Entity */
class Project extends Entity{

    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */
    protected $id;

    /**
     * @var integer
     * @ORM\Column(type="integer")
     */
    protected $status;

    /**
     * @var \User\Entity\Language
     * @ORM\ManyToOne(targetEntity="Language")
     */
    protected $sourceLanguage;

    /**
     * @var \User\Entity\Language
     * @ORM\ManyToMany(targetEntity="Language")
     */
    protected $targetLanguages;

    /**
     * @var string
     * @ORM\Column(type="string")
     */
    protected $reference;

    /**
     * @var integer
     * @ORM\Column(type="integer")
     */
    protected $priority;

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
     * @var \User\Entity\Field
     * @ORM\ManyToOne(targetEntity="Field")
     */
    protected $field;

    /**
     * @var \User\Entity\Employer
     * @ORM\ManyToOne(targetEntity="Employer")
     */
    protected $client;

    /**
     * @var \User\Entity\Staff
     * @ORM\ManyToOne(targetEntity="Staff")
     * @ORM\JoinTable(name="ProjectSale")
     */
    protected $sale;

    /**
     * @var \User\Entity\Staff
     * @ORM\ManyToOne(targetEntity="Staff")
     * @ORM\JoinTable(name="ProjectPm")
     */
    protected $pm;
    /**
     * @var string
     * @ORM\Column(type="string", nullable=True)
     */
    protected $interpretingInfo;

    /**
     * @var int
     * @ORM\Column(type="integer")
     */
    protected $serviceLevel = 0;

    /**
     * @var int
     * @ORM\Column(type="integer")
     */
    protected $duration = 0;

    /**
     * @var bool
     * @ORM\Column(type="boolean")
     */
    protected $is_deleted = 0;

    /**
     * @var int
     * @ORM\Column(type="integer")
     */
    protected $payStatus = 1;  # unpaid

    /**
     * @var int
     * @ORM\Column(type="array", length=255)
     */
    protected $types;

    public function getData(){
        return [
            'client' => $this->client->getData(),
            'dueDate' => $this->dueDate,
            'duration' => $this->duration,
            'field' => $this->field->getData(),
            'id' => $this->id,
            'interpretingInfo' => $this->interpretingInfo,
            'pm' => $this->pm->getData(),
            'priority' => $this->priority,
            'reference' => $this->reference,
            'sale' => $this->sale->getData(),
            'serviceLevel' => $this->serviceLevel,
            'sourceLanguage' => $this->sourceLanguage->getData(),
            'startDate' => $this->startDate,
            'status' => $this->status,
            'targetLanguages' => $this->getArrayData($this->targetLanguages),
            'types' => $this->types,
        ];
    }

    public function getId(){
        return $this->id;
    }
}