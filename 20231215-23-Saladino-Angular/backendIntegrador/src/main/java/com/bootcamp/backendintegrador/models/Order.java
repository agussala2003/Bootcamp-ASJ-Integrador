package com.bootcamp.backendintegrador.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.sql.Timestamp;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull(message = "Order number is required")
    @NotBlank(message = "Order number must be complete")
    @Column(unique = true, name = "order_number", nullable = false)
    private String orderNumber;

    @NotNull(message = "Issuance date is required")
    @Column(name = "issuance_date", nullable = false)
    private Timestamp issuanceDate;

    @NotNull(message = "Delivery date is required")
    @Column(name = "delivery_date", nullable = false)
    private Timestamp deliveryDate;

    @NotNull(message = "Reception information is required")
    @NotBlank(message = "Reception information must be complete")
    @Lob
    @Column(name = "reception_info", nullable = false, columnDefinition = "TEXT")
    private String receptionInfo;

    @NotNull(message = "Active status is required")
    @Column(name = "active", nullable = false)
    private Boolean active;

    @Column(name = "created_at")
    private Timestamp createdAt;

    @Column(name = "updated_at")
    private Timestamp updatedAt;
    
    @ManyToOne
    @JoinColumn(name = "supplier_id", referencedColumnName = "id")
    private Supplier supplier;

    @ManyToOne
    @JoinColumn(name = "status_id", referencedColumnName = "id")
    private Status status;
    
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    public Order() {

    }

    public Order(Integer id,
            String orderNumber,
            Timestamp issuanceDate,
            Timestamp deliveryDate,
            String receptionInfo,
            Supplier supplier,
            Boolean active,
            Status status,
            User user,
            Timestamp createdAt,
            Timestamp updatedAt) {
        this.id = id;
        this.orderNumber = orderNumber;
        this.issuanceDate = issuanceDate;
        this.deliveryDate = deliveryDate;
        this.receptionInfo = receptionInfo;
        this.supplier = supplier;
        this.active = active;
        this.status = status;
        this.user = user;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public Timestamp getIssuanceDate() {
        return issuanceDate;
    }

    public void setIssuanceDate(Timestamp issuanceDate) {
        this.issuanceDate = issuanceDate;
    }

    public Timestamp getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(Timestamp deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    public String getReceptionInfo() {
        return receptionInfo;
    }

    public void setReceptionInfo(String receptionInfo) {
        this.receptionInfo = receptionInfo;
    }

    public Supplier getSupplier() {
        return supplier;
    }

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }
}
