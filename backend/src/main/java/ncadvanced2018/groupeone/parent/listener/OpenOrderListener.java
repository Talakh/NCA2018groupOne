package ncadvanced2018.groupeone.parent.listener;

import lombok.extern.slf4j.Slf4j;
import ncadvanced2018.groupeone.parent.event.OpenOrderEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class OpenOrderListener {

//    @EventListener(condition = "#openOrderEvent.changedToOpenStatus")
//    public void handleOrderCreatedEvent(OpenOrderEvent openOrderEvent) {
//        System.out.println("@EventListener(condition = \"#openOrderEvent.changedToOpenStatus\")");
//    }

}
