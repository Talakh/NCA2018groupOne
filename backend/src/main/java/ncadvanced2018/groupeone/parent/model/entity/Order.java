package ncadvanced2018.groupeone.parent.model.entity;

import java.time.LocalDateTime;


public interface Order {

    Long getId();

    void setId(Long id);

    Office getOffice();

    void setOffice(Office office);

    User getUser();

    void setUser(User user);

    OrderStatus getOrderStatus();

    void setOrderStatus(OrderStatus orderStatus);

    Address getReceiverAddress();

    void setReceiverAddress(Address receiverAddress);

    Address getSenderAddress();

    void setSenderAddress(Address senderAddress);

    LocalDateTime getCreationTime();

    void setCreationTime(LocalDateTime creationTime);

    LocalDateTime getExecutionTime();

    void setExecutionTime(LocalDateTime executionTime);

    String getFeedback();

    void setFeedback(String feedback);

    String getDescription();

    void setDescription(String description);

    Order getParent();

    void setParent(Order parent);
}