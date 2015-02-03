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
class Itermtm extends Entity{

    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */
    protected $id;

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
    protected $sourcerepetitions;
	
	/**
     * @var integer
     * @ORM\Column(type="integer")
     */
    protected $sourcebawu;
	/**
     * @var integer
     * @ORM\Column(type="integer")
     */
    protected $sourcejiuwu;
	/**
     * @var integer
     * @ORM\Column(type="integer")
     */
    protected $sourcenomatch;
	/**
     * @var integer
     * @ORM\Column(type="integer")
     */
    protected $sourceqiwu;
	/**
     * @var integer
     * @ORM\Column(type="integer")
     */
    protected $sourcewushi;
	/**
     * @var integer
     * @ORM\Column(type="integer")
     */
    protected $sourceyibai;
   
        

}