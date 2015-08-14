<?php
/**
 * Created by PhpStorm.
 * User: antiprovn
 * Date: 9/28/14
 * Time: 11:50 AM
 */

namespace Admin\Entity;

use Common\Entity;

use Doctrine\ORM\Mapping as ORM;


/** @ORM\Entity */
class ProfileInfo extends Entity{

    /**
     * @var integer
     *
     * @ORM\Column(type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    protected $id;

    /** @ORM\Column(type="string") */
    protected $name;

    /** @ORM\Column(type="string") */
    protected $telephone = '';

    /** @ORM\Column(type="string") */
    protected $fax = '';

    /** @ORM\Column(type="string") */
    protected $address = '';

    /** @ORM\Column(type="string") */
    protected $city;

	/**
     * @ORM\ManyToOne(targetEntity="\User\Entity\Country")
     */
    protected $country;

    /** @ORM\Column(type="string") */
    protected $website='';
	/** @ORM\Column(type="string") */
    protected $note='';

    public function getData(){
        return array(
            'id' => $this->id,
            'name' => $this->name,
			'telephone' => $this->telephone,
			'fax' => $this->fax,
			'address' => $this->address,
			'city' => $this->city,
			'country' => ($this->country)?$this->country->getData():null,
            'website' => $this->website,
			'note' => $this->note
        );
    }

    public function getId(){
        return $this->id;
    }
}