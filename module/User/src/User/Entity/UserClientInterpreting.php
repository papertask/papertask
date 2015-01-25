<?php
/**
 * Created by PhpStorm.
 * User: antiprovn
 * Date: 9/28/14
 * Time: 11:51 AM
 */

namespace User\Entity;

use Doctrine\ORM\Mapping as ORM;

use Common\Entity;

/** @ORM\Entity */
class UserClientInterpreting extends Entity{

    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */
    protected $id;

    /**
     * @var \User\Entity\User
     * @ORM\ManyToOne(targetEntity="User")
     */
    protected $freelancer;
	
	/**
     * @var \User\Entity\User
     * @ORM\ManyToOne(targetEntity="User")
     */
    protected $client;
	
	public function getData(){
        return array(
            'id' => $this->id,
            'freelancer' => $this->freelancer->getFreelancer()->getData(),
			'client' => $this->client->getEmployer()->getData(),
        );
    }
	
	public function getClient(){
        return array(
            'id' => $this->id,
			'client' => $this->client->getEmployer()->getData(),
        );
    }

    public function getId(){
        return $this->id;
    }
}