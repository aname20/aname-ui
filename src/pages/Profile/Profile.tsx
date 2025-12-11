"use client"

import React from "react"
import { ArrowBack, MoreVert, Phone, Add } from "@mui/icons-material"
import { useMediaQuery, useTheme } from "@mui/material"
import { PrivateLayout } from "../../components/layouts/PrivateLayout"

const baseStyles: Record<string, React.CSSProperties> = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    padding: "8px 4px",
    background: "transparent",
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: 700,
    margin: 0,
  },

  profileTop: {
    display: "flex",
    gap: 20,
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 24,
  },

  nameBlock: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 6,
    minWidth: 180,
  },

  name: {
    color: "#456CE8",
    fontSize: 20,
    fontWeight: 700,
    margin: 0,
  },

  age: {
    color: "#AFC5FF",
    fontSize: 14,
    margin: 0,
  },

  contactChip: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#E8EEFF",
    border: "1.5px solid #456CE8",
    color: "#456CE8",
    padding: "6px 12px",
    borderRadius: 999,
    fontSize: 14,
    fontWeight: 600,
  },

  phoneIconCircle: {
    width: 22,
    height: 22,
    borderRadius: "50%",
    border: "1.5px solid #456CE8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  depNameBadge: {
    marginTop: 4,
    display: "inline-block",
    background: "#456CE8",
    color: "#fff",
    padding: "4px 10px",
    borderRadius: 12,
    fontSize: 13,
    fontWeight: 600,
  },

  addButton: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    background: "#F3F4F6",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },

  smallText: {
    fontSize: 13,
    color: "#6B7280",
  },

  section: {
    marginTop: 24,
    marginBottom: 16,
    width: "100%",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 12,
    color: "#000",
    textAlign: "center",
  },

  contactsRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "center",
  },

  dependentCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },

  depAvatar: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid #D9D0C7",
  },

  menuButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}

interface EmergencyContact {
  id: string
  name: string
  phone: string
}

interface Dependent {
  id: string
  name: string
  avatar: string
}

interface ProfileData {
  id: string
  name: string
  age: number
  avatar: string
  emergencyContacts: EmergencyContact[]
  dependents: Dependent[]
}

const mockProfile: ProfileData = {
  id: "1",
  name: "Luana Gomes",
  age: 26,
  avatar: "/smiling-woman-profile.jpg",
  emergencyContacts: [
    { id: "1", name: "Raquel", phone: "8199677-8855" },
    { id: "2", name: "João", phone: "8199677-8855" },
  ],
  dependents: [
    { id: "1", name: "Cristina", avatar: "/young-girl-child-photo.jpg" },
    { id: "2", name: "João", avatar: "/young-man-beard-photo.jpg" },
    { id: "3", name: "Miguel", avatar: "/young-boy-photo.jpg" },
  ],
}

export const Profile: React.FC = () => {
  const profile = mockProfile
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  // Estilos dinâmicos baseados no breakpoint
  const styles: Record<string, React.CSSProperties> = {
    ...baseStyles,
    container: {
      width: "100%",
      maxWidth: isDesktop ? 900 : 1200,
      margin: "0 auto",
      padding: isDesktop ? "32px 24px" : "12px",
      display: "flex",
      flexDirection: "column",
      gap: 20,
      alignItems: "center",
    },
    card: {
      background: "#FFFFFF",
      border: "1px solid #E5E7EB",
      borderRadius: 12,
      padding: isDesktop ? "40px" : "20px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      width: "100%",
      maxWidth: isDesktop ? 800 : "100%",
    },
    avatar: {
      width: isDesktop ? 120 : 100,
      height: isDesktop ? 120 : 100,
      borderRadius: "50%",
      objectFit: "cover",
      border: "3px solid #D9D0C7",
    },
    dependentsGrid: {
      display: "grid",
      gridTemplateColumns: isDesktop ? "repeat(auto-fit, minmax(120px, 1fr))" : "repeat(auto-fill, minmax(100px, 1fr))",
      gap: 16,
      marginTop: 12,
      justifyContent: isDesktop ? "center" : "flex-start",
      maxWidth: isDesktop ? 600 : "100%",
      margin: isDesktop ? "12px auto 0" : "12px 0 0",
    },
    profileTop: {
      ...baseStyles.profileTop,
      justifyContent: isDesktop ? "center" : "flex-start",
    },
    section: {
      ...baseStyles.section,
    },
    sectionTitle: {
      ...baseStyles.sectionTitle,
      textAlign: isDesktop ? "center" : "left",
    },
    contactsRow: {
      ...baseStyles.contactsRow,
      justifyContent: isDesktop ? "center" : "flex-start",
    },
  }

  return (
    <PrivateLayout title="Meu Perfil">
      <div style={styles.container}>
        {/* header - apenas no mobile */}
        {!isDesktop && (
          <div style={styles.header}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button style={{ background: "none", border: "none", cursor: "pointer" }}>
                <ArrowBack />
              </button>
              <h1 style={styles.headerTitle}>Meu Perfil</h1>
            </div>

            <button style={styles.menuButton} aria-label="menu">
              <MoreVert />
            </button>
          </div>
        )}

        {/* card */}
        <div style={styles.card}>
            <div style={styles.profileTop}>
              <img src={profile.avatar || "/placeholder.svg"} alt={profile.name} style={styles.avatar} />

              <div style={styles.nameBlock}>
                <h2 style={styles.name}>{profile.name}</h2>
                <p style={styles.age}>({profile.age} anos)</p>
                <p style={styles.smallText}>ID: {profile.id}</p>
              </div>
            </div>

            {/* contacts */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>Contatos de Emergência</h3>
              <div style={styles.contactsRow}>
                {profile.emergencyContacts.map((c) => (
                  <div key={c.id} style={styles.contactChip}>
                    <span style={styles.phoneIconCircle}>
                      <Phone style={{ fontSize: 12 }} />
                    </span>
                    {c.name} • {c.phone}
                  </div>
                ))}
              </div>
            </div>

            {/* dependents */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>Dependentes</h3>

              <div style={styles.dependentsGrid}>
                {profile.dependents.map((d) => (
                  <div key={d.id} style={styles.dependentCard}>
                    <img src={d.avatar || "/placeholder.svg"} alt={d.name} style={styles.depAvatar} />
                    <span style={styles.depNameBadge}>{d.name}</span>
                  </div>
                ))}

                {/* add button card */}
                <div style={styles.dependentCard}>
                  <button style={styles.addButton} aria-label="Adicionar dependente">
                    <Add />
                  </button>
                  <span style={styles.depNameBadge}>Adicionar</span>
                </div>
              </div>
            </div>
          </div>
        </div>
    </PrivateLayout>
  )
}

export default Profile