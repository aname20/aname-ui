"use client"

import React from "react"
import { PrivateLayout } from "../../components/layouts/PrivateLayout"
import { Carousel } from "./components/Carousel"
import { PersonAdd, People, Folder } from "@mui/icons-material"


const styles: Record<string, React.CSSProperties> = {
  mainContent: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 20,
    padding: "8px",
    paddingBottom: "-10px",
    margin: "0 auto",
    maxWidth: "1200px", 
  },

  section: {
    marginBottom: "24px",
    marginTop: "-25px", 
    borderBottom: "1px solid #3375f5", 
    paddingBottom: "20px", 
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
    flexWrap: "wrap",
    gap: "8px",
  },

  sectionTitle: {
    fontSize: "18px",
    fontWeight: 600,
    margin: 0,
    color: "#000",
  },

  viewMoreButton: {
    background: "#3375f5",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "background 0.2s",
  },

  medicationCard: {
    background: "#fff",
    border: "1px solid #e0e0e0",
    borderRadius: "12px",
    padding: "12px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
    width: "100%",
    minWidth: "280px",
    flex: "0 0 auto",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "8px",
  },

  cardTitle: {
    fontSize: "14px",
    fontWeight: 700,
    margin: 0,
    color: "#333",
    flex: 1,
  },

  dosage: {
    fontSize: "12px",
    fontWeight: 600,
    color: "#666",
    background: "#f5f5f5",
    padding: "2px 6px",
    borderRadius: "4px",
    whiteSpace: "nowrap",
  },

  medicationFrequency: {
    fontSize: "12px",
    color: "#666",
    margin: "4px 0",
  },

  medicationTimes: {
    fontSize: "12px",
    color: "#666",
    margin: "4px 0",
  },

  person: {
    fontSize: "11px",
    color: "#999",
    marginTop: "8px",
    paddingTop: "8px",
    borderTop: "1px solid #f0f0f0",
  },

  eventCard: {
    background: "#fff",
    border: "1px solid #e0e0e0",
    borderRadius: "12px",
    padding: "12px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
    width: "100%",
    minWidth: "280px",
    flex: "0 0 auto",
  },

  eventDate: {
    fontSize: "12px",
    color: "#666",
    margin: "4px 0",
  },

  eventTime: {
    fontSize: "12px",
    color: "#666",
    margin: "4px 0",
  },

  bannerSection: {
    marginBottom: "24px",
  },

  banner: {
    background: "linear-gradient(135deg, #27ae60 0%, #16a34a 100%)",
    borderRadius: "12px",
    padding: "16px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#fff",
  },

  bannerDiscount: {
    fontSize: "16px",
    fontWeight: 900,
    margin: "0 0 4px 0",
    letterSpacing: "1px",
    backgroundColor: "rgba(255,0,0,0.7)",
    display: "inline-block",
    padding: "4px 8px",
    borderRadius: "4px",
  },

  bannerText: {
    fontSize: "12px",
    margin: "8px 0 0 0",
    opacity: 0.9,
    fontWeight: 700,
  },

  cadastrosGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
    gap: "12px",
    marginTop: "12px",
  },

  cadastroBtn: {
    background: "#fff",
    border: "1px solid #e0e0e0",
    borderRadius: "12px",
    padding: "16px 8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    cursor: "pointer",
    transition: "all 0.2s",
    fontSize: "12px",
    fontWeight: 600,
    color: "#333",
  },

  cadastroIcon: {
    fontSize: "28px",
  },

  iconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    flexDirection: "column",
  },
}

interface MedicationCard {
  id: string
  name: string
  dosage: string
  frequency: string
  times: string
  person: string
}

interface EventCard {
  id: string
  title: string
  date: string
  time: string
  person: string
}

{/* mock simulador de dados */}
export const Home: React.FC = () => {
  const medications: MedicationCard[] = [
    {
      id: "1",
      name: "Clonazepam",
      dosage: "5mg",
      frequency: "2x ao dia",
      times: "7:00 | 19:00",
      person: "Graça Lima",
    },
    {
      id: "2",
      name: "Prostaline",
      dosage: "1000mg",
      frequency: "4x ao dia",
      times: "6:00 | 12:00 | 18:00 | 00:00",
      person: "Joaquim Bezerra",
    },
    {
      id: "3",
      name: "Vitamina D",
      dosage: "2000UI",
      frequency: "1x ao dia",
      times: "08:00",
      person: "Maria Silva",
    },
  ]

  const events: EventCard[] = [
    {
      id: "1",
      title: "Eletrocardiograma",
      date: "03/04",
      time: "18:00",
      person: "Graça Lima",
    },
    {
      id: "2",
      title: "Infiltração no joelho",
      date: "07/04",
      time: "7:00",
      person: "Maria Luiz da Silva",
    },
    {
      id: "3",
      title: "Consulta Oftalmológica",
      date: "10/04",
      time: "14:00",
      person: "João Santos",
    },
  ]

  const cadastros: MedicationCard[] = [
    {
      id: "1",
      name: "Novo Dependente",
      dosage: "",
      frequency: "",
      times: "",
      person: "",
    },
    {
      id: "2",
      name: "Novo Documento",
      dosage: "",
      frequency: "",
      times: "",
      person: "",
    },
    {
      id: "3",
      name: "Novo Evento",
      dosage: "",
      frequency: "",
      times: "",
      person: "",
    },
  ]

  const suaArea: EventCard[] = [
    {
      id: "1",
      title: "Dependentes",
      date: "",
      time: "",
      person: "",
    },
    {
      id: "2",
      title: "Documentos",
      date: "",
      time: "",
      person: "",
    },

    {
      id: "3",
      title: "Agenda",
      date: "",
      time: "",
      person: "",
    },
  ]

  const medicationItems = medications.map((med) => ({
    id: med.id,
    content: (
      <div style={styles.medicationCard}>
        <div style={styles.cardHeader}>
          <h3 style={styles.cardTitle}>{med.name}</h3>
          <span style={styles.dosage}>{med.dosage}</span>
        </div>
        <p style={styles.medicationFrequency}>{med.frequency}</p>
        <p style={styles.medicationTimes}>{med.times}</p>
        <p style={styles.person}>{med.person}</p>
      </div>
    ),
  }))

  const eventItems = events.map((evt) => ({
    id: evt.id,
    content: (
      <div style={styles.eventCard}>
        <div style={styles.cardHeader}>
          <h3 style={styles.cardTitle}>{evt.title}</h3>
        </div>
        <p style={styles.eventDate}>{evt.date}</p>
        <p style={styles.eventTime}>{evt.time}</p>
        <p style={styles.person}>{evt.person}</p>
      </div>
    ),
  }))

  const cadastroItems = cadastros.map((cad) => ({
    id: cad.id,
    content: (
      <div style={styles.cadastroBtn}>
        <div style={styles.iconContainer}>
          <PersonAdd style={styles.cadastroIcon} />
          <span>{cad.name}</span>
        </div>
      </div>
    ),
  }))

  const suaAreaItems = suaArea.map((area) => ({
    id: area.id,
    content: (
      <div style={styles.cadastroBtn}>
        <div style={styles.iconContainer}>
          {area.title === "Dependentes" ? (
            <People style={styles.cadastroIcon} />
          ) : (
            <Folder style={styles.cadastroIcon} />
          )}
          <span>{area.title}</span>
        </div>
      </div>
    ),
  }))

  return (
    <PrivateLayout>
      <main style={styles.mainContent}>
        {/* Próximos Remédios */}
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Próximos Remédios</h2>
            <button
              style={styles.viewMoreButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#2563eb"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#3375f5"
              }}
            >
              Ver Mais +
            </button>
          </div>
          <Carousel items={medicationItems} showDots={true} />
        </section>

        {/* Próximos Eventos */}
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Próximos Eventos</h2>
            <button
              style={styles.viewMoreButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#2563eb"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#3375f5"
              }}
            >
              Ver Mais +
            </button>
          </div>
          <Carousel items={eventItems} showDots={true} />
        </section>

        {/* Cadastros */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Cadastros</h2>
          <Carousel items={cadastroItems} showDots={true} />
        </section>

        {/* Sua Área */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Sua Área</h2>
          <Carousel items={suaAreaItems} showDots={true} />
        </section>

        {/* Banner */}
        <section style={styles.bannerSection}>
          <div style={styles.banner}>
            <div>
              <p style={styles.bannerDiscount}>Titulo do banner</p>
              <p style={styles.bannerText}>Texto se necessário</p>
            </div>
          </div>
        </section>
      </main>
    </PrivateLayout>
  )
}

export default Home
