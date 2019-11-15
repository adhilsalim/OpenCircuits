import {DEFAULT_SIZE,
        IO_PORT_LENGTH} from "core/utils/Constants";

import {V, Vector} from "Vector";

import {Port} from "core/models/ports/Port";
import {InputPort} from "../InputPort";
import {OutputPort} from "../OutputPort";

import {Positioner} from "core/models/ports/positioners/Positioner";


export class MuxPositioner<T extends Port> extends Positioner<T> {

    public updatePortPositions(ports: Array<T>): void {
        ports.forEach((port, i) => {
            const width = port.getParent().getSize().x;

            // Calculate y position of port
            let l = -DEFAULT_SIZE/2*(i - ports.length/2 + 0.5);
            if (i === 0) l--;
            if (i === ports.length-1) l++;

            port.setOriginPos(V(0, l));
            port.setTargetPos(V(port.getInitialDir().scale(IO_PORT_LENGTH+(width - DEFAULT_SIZE)/2).x, l));
        });
    }

}

export class MuxSelectPositioner extends Positioner<InputPort> {

    /**
     * Port positiong for Multiplexer/Demultiplexer select lines
     *
     * @param arr The array of input ports
     */
    public updatePortPositions(ports: Array<InputPort>): void {
        ports.forEach((port, i) => {
            const height = port.getParent().getSize().y;

            // Calculate x position of port
            let l = -DEFAULT_SIZE/2*(i - ports.length/2 + 0.5);
            if (i === 0) l--;
            if (i === ports.length-1) l++;

            // Sets postition
            port.setOriginPos(V(l, 0));
            port.setTargetPos(V(l, IO_PORT_LENGTH+height/2-DEFAULT_SIZE/2));
        });
    }

}

export class MuxOutputPositioner extends Positioner<OutputPort> {
    /**
     * Port positioning for Multiplexer output ports
     * 
     * @paramm arr The array of output ports
     */
    public updatePortPositions(ports: Array<OutputPort>): void {
        ports.forEach((port, i) => {
            const height = port.getParent().getSize().y;
            /*
                TODO: get the normal x value then add, not current x value
                      change the origin position based on IO_PORT_LENGTH so its not too long
            */
/*
            // calculate the number of select ports (cannot be )
            let sel = Math.log2(port.getParent().getInputPortCount().getValue());
            // set the target position of the port
            //let l = port.getParent().getSize().x; //+ DEFAULT_SIZE;
            //let l = port.getParent().getPos().x// + port.getParent().getSize().x;
            //let l = port.getParent().getTransform().getBottomRight().x
            //let l = port.getParent().getMaxPos().x;

            let l = Vector.max(...port.getParent().getTransform().getCorners());

            port.setOriginPos(V(l.x, port.getParent().getSize().y));
            // set the origin position to be a DEFAULT_SIZE away from the target position
            port.setTargetPos(port.getOriginPos().add(V(IO_PORT_LENGTH, 0)))
            */
            port.setTargetPos(port.getParent().getSize())
            let width = port.getParent().getSize().x;
            //port.setOriginPos(port.getTargetPos().sub(V(IO_PORT_LENGTH, 0)));
            port.setOriginPos(V(width/2, 0));
            port.setTargetPos(V(width/2 + IO_PORT_LENGTH - DEFAULT_SIZE/2, 0));
            //let l = 10*Math.max(port.getParent().getInputPortCount().getValue(), port.getParent().getOutputPortCount().getValue());
            //port.setTargetPos(port.getTargetPos().add(V(l, l)))
        });
    }
}

export class DemuxInputPositioner extends Positioner<InputPort> {
    /**
     * Port positioning for Demultiplexer input port
     * 
     * @paramm arr the array of input ports
     */
    public updatePortPositions(ports: Array<InputPort>): void {
        ports.forEach((port, i) => {
            //const xPos = port.getParent().getSize().x;
            //let l = port.getParent().getSize().x - 10*port.getParent().getInputPortCount().getValue();
            let l = port.getParent().getSize().x;
            //port.setOriginPos()
            //port.setTargetPos(V())
        });       
    }
}