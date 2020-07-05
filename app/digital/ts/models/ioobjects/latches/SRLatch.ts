import {serializable} from "serialeazy";

import {Positioner} from "core/models/ports/positioners/Positioner";
import {InputPort} from "digital/models/ports/InputPort";

import {Latch} from "./Latch";

@serializable("SRLatch")
export class SRLatch extends Latch {

    public constructor() {
        super(3, new Positioner<InputPort>("left", 3/4));

        this.getInputPort(0).setName("R");
        this.getInputPort(1).setName(">");
        this.getInputPort(2).setName("S");
    }

    // @Override
    public activate(): void {
        this.clock  = this.inputs.get(1).getIsOn();
        const set   = this.inputs.get(2).getIsOn();
        const reset = this.inputs.get(0).getIsOn();
        if (this.clock) {
            if (set && reset) {
                // undefined behavior
            } else if (set) {
                this.state = true;
            } else if (reset) {
                this.state = false;
            }
        }

        super.activate(this.state, 1);
        super.activate(!this.state, 0);
    }

    public getDisplayName(): string {
        return "SR Latch";
    }
}
