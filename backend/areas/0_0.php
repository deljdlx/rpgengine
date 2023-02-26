<?php

class Area implements JsonSerializable
{
    private $elements = [];

    public function add($x, $y, $element)
    {
        $this->elements[] = [
            'x' => $x,
            'y' => $y,
            'element' => $element,
        ];
    }

    public function jsonSerialize(): mixed
    {
        return $this->elements;
    }
}


$area = new Area();
$area->add(10, 0, 'House01');
$area->add(200, 360, 'Fountain00');
$area->add(50, 210, 'Woman00');
$area->add(250, 0, 'FenceGroup00');

// $area->add(10, 0, 'House00');


echo json_encode($area);



