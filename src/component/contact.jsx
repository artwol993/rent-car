import React, { useState } from "react";
import "../style/contact.css";
import { useForm } from "react-hook-form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Cars from "./gallery-data";

function ConfirmationModal({ showModal, onClose }) {
  return (
    <Modal
      show={showModal}
      onHide={onClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="contact-modal">
        <div className="contact-modal-picture"></div>
        <p className="contact-modal-txt">
          Dziękujemy za wysłanie zapytania. Skontaktujemy się z Tobą najszybciej
          jak to możliwe
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} className="contact-button">
          Zamknij
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function Contact({ selectedCar, onCarSelect }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCarSelect = (event) => {
    const selectedCarName = event.target.value;
    onCarSelect(selectedCarName);
  };

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const onSubmit = (data) => {
    setShowConfirmationModal(true);
  };

  const closeModal = () => {
    setShowConfirmationModal(false);
  };

  return (
    <>
      <section id="contact">
        <Container className="my-5 ">
          <Form
            onSubmit={handleSubmit(onSubmit)}
            action="https://formsubmit.co/biuro@weselny-woz.pl"
            method="POST"
          >
            <div className="container-contact">
              <div className="container-form">
                <h2> Zapytaj o termin</h2>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridState">
                    <FloatingLabel>Auto</FloatingLabel>
                    <Form.Select
                      {...register("car", { required: "Wybierz auto" })}
                      value={selectedCar || " "}
                      onChange={handleCarSelect}
                      name="car"
                    >
                      <option value="">Wybierz auto...</option>
                      {Cars.map((car) => (
                        <option key={car.id} value={car.name}>
                          {car.name}
                        </option>
                      ))}
                    </Form.Select>
                    {errors.car && <p>{errors.car.message}</p>}
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridState">
                    <FloatingLabel>Termin</FloatingLabel>
                    <Form.Control
                      type="date"
                      name="date"
                      {...register("date", { required: "Podaj datę" })}
                    />
                    {errors.date && <p>{errors.date.message}</p>}
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="city-name">
                    <FloatingLabel controlId="city" label="Miejscowość">
                      <Form.Control
                        type="city"
                        name="city"
                        {...register("city", {
                          required: "Podaj nazwę miejscowości",
                        })}
                      />
                    </FloatingLabel>
                    {errors.city && <p>{errors.city.message}</p>}
                  </Form.Group>

                  <Form.Group as={Col} controlId="city-zip">
                    <FloatingLabel controlId="formZip" label="Kod pocztowy">
                      <Form.Control
                        type="city-zip"
                        name="city-zip"
                        {...register("zip", {
                          required: "Podaj kod pocztowy",
                          pattern: {
                            value: /^[0-9]{2}-[0-9]{3}$/,
                            message: "Błędny kod pocztowy",
                          },
                        })}
                      />
                    </FloatingLabel>
                    {errors.zip && <p>{errors.zip.message}</p>}
                  </Form.Group>
                </Row>

                <Form.Group as={Col} controlId="user-name" className="mb-3">
                  <FloatingLabel controlId="floatingInput" label="Imię">
                    <Form.Control
                      type="name"
                      name="name"
                      {...register("name", {
                        required: "Podaj imię",
                        pattern: {
                          value: /^[A-Za-z ]+$/,
                          message: "Błędne imie",
                        },
                      })}
                    />
                  </FloatingLabel>
                  {errors.name && <p>{errors.name.message}</p>}
                </Form.Group>

                <Form.Group as={Col} controlId="user-email" className="mb-3">
                  <FloatingLabel controlId="floatingInput" label="Email">
                    <Form.Control
                      type="email"
                      name="email"
                      {...register("email", {
                        required: "Podaj Email",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "Błędny email",
                        },
                      })}
                    />
                  </FloatingLabel>
                  {errors.email && <p>{errors.email.message}</p>}
                </Form.Group>

                <Form.Group as={Col} controlId="user-phone" className="mb-3">
                  <FloatingLabel controlId="floatingInput" label="Telefon">
                    <Form.Control
                      type="phone"
                      name="phone"
                      {...register("phone", {
                        required: "Podaj Numer telefonu",
                        pattern: {
                          value: /^(?:\+?48)?(?:\d{9})$/,
                          message: "Błędny numer telefonu",
                        },
                      })}
                    />
                  </FloatingLabel>
                  {errors.phone && <p>{errors.phone.message}</p>}
                </Form.Group>

                <FloatingLabel
                  controlId="floatingTextarea2"
                  label="Dodatkowe informacje"
                >
                  <Form.Control
                    as="textarea"
                    name="comment"
                    placeholder="Zostaw komentarz"
                    style={{ height: "200px" }}
                    {...register("comment", {
                      maxLength: {
                        value: 500,
                        message: "Przekroczyłeś maksymalną ilość znaków",
                      },
                    })}
                  />
                </FloatingLabel>
                {errors.comment && <p>{errors.comment.message}</p>}

                <div className="d-grid gap-2 m-3">
                  <Button size="lg" type="submit" className="contact-button">
                    Proszę o wycenę
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </Container>
      </section>
      <ConfirmationModal
        showModal={showConfirmationModal}
        onClose={closeModal}
      />
    </>
  );
}

export default Contact;
