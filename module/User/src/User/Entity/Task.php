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
     * @var decimal
     * @ORM\Column(type="decimal")
     */
    protected $rate;

    /**
     * @var integer
     * @ORM\Column(type="integer")
     */
    protected $quantity;

    /**
     * @var integer
     * @ORM\Column(type="integer")
     */
    protected $unit;

    /**
     * @var integer
     * @ORM\Column(type="integer")
     */
    protected $total;

    /**
     * @var integer
     * @ORM\Column(type="integer")
     */
    protected $type;
}