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
class ProfileBank extends Entity{

    /**
     * @var integer
     *
     * @ORM\Column(type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    protected $id;

    /**
     * @ORM\Column(type="string",nullable=true)
     */
    protected $paypal;

    /**
     * @ORM\Column(type="string",nullable=true)
     */
    protected $alipay;

    /**
     * @ORM\Column(type="string",nullable=true)
     */
    protected $account;

    /**
     * @ORM\Column(type="string",nullable=true)
     */
    protected $address;

    /**
     * @ORM\Column(type="string",nullable=true)
     */
    protected $city;

    /**
     * @ORM\Column(type="string",nullable=true)
     */
    protected $country;

    /**
     * @ORM\Column(type="string",nullable=true)
     */
    protected $swift;

    /**
     * @ORM\Column(type="string",nullable=true)
     */
    protected $name;

    /**
     * @ORM\Column(type="string",nullable=true)
     */
    protected $accountNo;

    /**
     * @ORM\Column(type="string",nullable=true)
     */
    protected $routingNumber;
	/**
     * @ORM\Column(type="string",nullable=true)
     */
    protected $beneficiar_name;
	/**
     * @ORM\Column(type="string",nullable=true)
     */
    protected $note;

    public function getData(){
        return [
            'id' => $this->id,
            'paypal' => $this->paypal,
            'alipay' => $this->alipay,
            'account' => $this->account,
            'address' => $this->address,
            'city' => $this->city,
            'country' => $this->country,
            'name' => $this->name,
            'accountNo' => $this->accountNo,
            'swift' => $this->swift,
            'routingNumber' => $this->routingNumber,
			'beneficiar_name'=> $this->name,
			'note'=> $this->note,
        ];
    }

    /**
     * Set data
     * @param array $arr
     * @return $this
     */
    public function setData(array $arr){
        $keys = array(
            'id',
            'paypal',
            'alipay',
            'account',
            'address',
            'city',
            'country',
            'name',
            'accountNo',
            'swift',
			'beneficiar_name',
            'routingNumber',
			'note'
        );
        foreach($keys as $key){
            if(isset($arr[$key])){
                $this->$key = $arr[$key];
            }
        }
        return $this;
    }
}