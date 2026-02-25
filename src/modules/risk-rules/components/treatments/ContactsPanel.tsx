import React, { useState } from 'react';
import type { Contact, ContactShift } from '../../types/risk.types';
import { CrModal } from '../shared/CrModal';
import { FieldErrorIcon } from '../shared/FieldErrorIcon';
import { IconEdit, IconTrash } from '../shared/Icons';
import { ModalSelect, type ModalSelectOption } from '../shared/ModalSelect';

const TURNOS_OPTIONS: ModalSelectOption[] = [
  { value: 'manha', label: 'Manhã' },
  { value: 'tarde', label: 'Tarde' },
  { value: 'noite', label: 'Noite' },
  { value: 'madrugada', label: 'Madrugada' },
];

/** Máscara telefone: DDD + 9 dígitos → (XX) 9XXXX-XXXX */
function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits ? `(${digits}` : '';
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 3)}${digits.slice(3, 7)}-${digits.slice(7)}`;
}

function phoneToRaw(formatted: string): string {
  return formatted.replace(/\D/g, '');
}

interface ContactsPanelProps {
  contacts: Contact[];
  onSave: (contact: Omit<Contact, 'id'> & { id?: string }) => void;
  onDelete: (contact: Contact) => void;
}

export const ContactsPanel: React.FC<ContactsPanelProps> = ({ contacts, onSave, onDelete }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Contact | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [turnosValue, setTurnosValue] = useState(''); // comma-separated for ModalSelect
  const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ name?: boolean; phone?: boolean; email?: boolean }>({});

  const openNew = () => {
    setEditing(null);
    setName('');
    setPhone('');
    setEmail('');
    setDescription('');
    setTurnosValue('');
    setTimeStart('');
    setTimeEnd('');
    setFieldErrors({});
    setModalOpen(true);
  };
  const openEdit = (c: Contact) => {
    setEditing(c);
    setName(c.name ?? '');
    setPhone(c.phone ? formatPhone(c.phone) : '');
    setEmail(c.email ?? '');
    setDescription(c.description ?? '');
    setTurnosValue(c.turnos?.length ? c.turnos.join(', ') : '');
    setTimeStart(c.timeStart ?? '');
    setTimeEnd(c.timeEnd ?? '');
    setFieldErrors({});
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
    setFieldErrors({});
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
    if (fieldErrors.phone) setFieldErrors((e2) => ({ ...e2, phone: false }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nameTrimmed = name.trim();
    const phoneRaw = phoneToRaw(phone);
    const emailTrimmed = email.trim();
    const nameInvalid = !nameTrimmed;
    const phoneInvalid = phoneRaw.length < 10;
    const emailInvalid = !emailTrimmed || !emailTrimmed.includes('@');
    const errors = { name: nameInvalid, phone: phoneInvalid, email: emailInvalid };
    setFieldErrors(errors);
    if (nameInvalid || phoneInvalid || emailInvalid) return;
    const turnosParsed = turnosValue
      ? (turnosValue.split(',').map((v) => v.trim()).filter(Boolean) as ContactShift[])
      : undefined;
    onSave({
      ...(editing?.id && { id: editing.id }),
      name: nameTrimmed,
      phone: formatPhone(phoneRaw),
      email: emailTrimmed,
      description: description.trim() || undefined,
      turnos: turnosParsed?.length ? turnosParsed : undefined,
      timeStart: timeStart.trim() || undefined,
      timeEnd: timeEnd.trim() || undefined,
    });
    closeModal();
  };

  return (
    <>
      <div className="drawer-toolbar drawer-toolbar--end">
        <button type="button" className="btn btn-primary" onClick={openNew}>
          Novo contato
        </button>
      </div>
      <div className="contacts-table-wrap drawer-contacts-table">
        <table className="list-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Telefone</th>
              <th>Email</th>
              <th>Turnos</th>
              <th>Descrição</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {contacts.length === 0 ? (
              <tr>
                <td colSpan={6} className="list-empty">
                  Nenhum contato cadastrado.
                </td>
              </tr>
            ) : (
              contacts.map((c) => (
                <tr key={c.id}>
                  <td>{c.name ?? '—'}</td>
                  <td>{c.phone ?? '—'}</td>
                  <td>{c.email ?? '—'}</td>
                  <td>
                    <span className="contact-turnos-cell">
                      {c.turnos?.length
                        ? c.turnos.map((t) => (
                            <span key={t} className="contact-turno-chip">
                              {TURNOS_OPTIONS.find((o) => o.value === t)?.label ?? t}
                            </span>
                          ))
                        : '—'}
                      {(c.timeStart || c.timeEnd) && (
                        <span className="contact-time-range">
                          {[c.timeStart, c.timeEnd].filter(Boolean).join('–')}
                        </span>
                      )}
                    </span>
                  </td>
                  <td>{c.description ?? '—'}</td>
                  <td className="list-cell-actions">
                    <div className="list-actions">
                      <button
                        type="button"
                        className="btn btn-icon-action"
                        onClick={() => openEdit(c)}
                        aria-label="Editar"
                      >
                        <IconEdit />
                      </button>
                      <button
                        type="button"
                        className="btn btn-icon-action ds-icon-danger"
                        onClick={() => onDelete(c)}
                        aria-label="Excluir"
                      >
                        <IconTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <CrModal
        open={modalOpen}
        title={editing ? 'Editar contato' : 'Novo contato'}
        onClose={closeModal}
        formId="contact-form"
        primaryLabel="Salvar"
        cancelLabel="Cancelar"
      >
        <form id="contact-form" onSubmit={handleSubmit} className="form-card contact-form">
          <div className="contact-form-row contact-form-row--name-phone-email">
            <div className={`form-group ${fieldErrors.name ? 'has-error' : ''}`}>
              <div className="form-group__label-row">
                <label htmlFor="contact-name">Nome</label>
              </div>
              <div className="form-group__input-with-error">
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  maxLength={30}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (fieldErrors.name) setFieldErrors((err) => ({ ...err, name: false }));
                  }}
                  placeholder="Nome"
                  className={fieldErrors.name ? 'input-error' : ''}
                  aria-invalid={fieldErrors.name}
                />
                {fieldErrors.name && (
                  <span className="form-group__field-error-icon">
                    <FieldErrorIcon />
                  </span>
                )}
              </div>
            </div>
            <div className={`form-group ${fieldErrors.phone ? 'has-error' : ''}`}>
              <div className="form-group__label-row">
                <label htmlFor="contact-phone">Telefone</label>
              </div>
              <div className="form-group__input-with-error">
                <input
                  id="contact-phone"
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="(00) 00000-0000"
                  maxLength={16}
                  className={fieldErrors.phone ? 'input-error' : ''}
                  aria-invalid={fieldErrors.phone}
                />
                {fieldErrors.phone && (
                  <span className="form-group__field-error-icon">
                    <FieldErrorIcon />
                  </span>
                )}
              </div>
            </div>
            <div className={`form-group ${fieldErrors.email ? 'has-error' : ''}`}>
              <div className="form-group__label-row">
                <label htmlFor="contact-email">Email</label>
              </div>
              <div className="form-group__input-with-error">
                <input
                  id="contact-email"
                  type="text"
                  inputMode="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (fieldErrors.email) setFieldErrors((err) => ({ ...err, email: false }));
                  }}
                  placeholder="email@exemplo.com"
                  className={fieldErrors.email ? 'input-error' : ''}
                  aria-invalid={fieldErrors.email}
                />
                {fieldErrors.email && (
                  <span className="form-group__field-error-icon">
                    <FieldErrorIcon />
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="form-group">
            <ModalSelect
              id="contact-turnos"
              label="Turnos"
              value={turnosValue}
              onChange={setTurnosValue}
              options={TURNOS_OPTIONS}
              placeholder="Selecionar turnos (opcional)"
              multiple
            />
          </div>
          <div className="contact-form-row contact-form-row--time">
            <div className="form-group">
              <label htmlFor="contact-time-start">Horário início (opcional)</label>
              <input
                id="contact-time-start"
                type="time"
                value={timeStart}
                onChange={(e) => setTimeStart(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact-time-end">Horário fim (opcional)</label>
              <input
                id="contact-time-end"
                type="time"
                value={timeEnd}
                onChange={(e) => setTimeEnd(e.target.value)}
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="contact-desc">Descrição</label>
            <textarea
              id="contact-desc"
              className="textarea-description"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Texto livre"
            />
          </div>
        </form>
      </CrModal>
    </>
  );
};

export default ContactsPanel;
