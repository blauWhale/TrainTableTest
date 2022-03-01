<?php


class PublicTransport
{
    public $name;
    public $number;
    public $destination;
    public $category;
    public $operator;
    public $departure;

    // Methods
    function set_name($name) {
        $this->name = $name;
    }
    function get_name() {
        return $this->name;
    }
}