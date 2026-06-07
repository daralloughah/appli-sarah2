/* =============================================================
   DONNÉES DE DÉMO (faux contenu)
   À terme : ces tableaux seront remplacés par des appels Supabase
   ex: const { data: moniteurs } = await supabase.from("moniteurs").select()
   Garder EXACTEMENT la même structure d'objet => zéro modif côté affichage.
   ============================================================= */

const moniteurs = [
  { i:'K', n:'Karim B.', v:'Paris 11ᵉ', boite:'Manuelle', prix:28, dispo:3 },
  { i:'L', n:'Laura M.', v:'Paris 15ᵉ', boite:'Auto', prix:32, dispo:1 },
  { i:'S', n:'Sofiane R.', v:'Montreuil', boite:'Manuelle', prix:25, dispo:5 },
  { i:'A', n:'Aïcha D.', v:'Paris 20ᵉ', boite:'Auto', prix:30, dispo:2 },
];

const aideContent = {
  eleve: [
    { t:'Trouver un moniteur', d:'Rechercher et contacter un moniteur près de chez vous.', c:'red', ic:'M21 21l-4.3-4.3M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z' },
    { t:'Réserver une leçon', d:'Choisir un créneau, modifier ou annuler un rendez-vous.', c:'blue', ic:'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z' },
    { t:'Paiement & formules', d:'Moyens de paiement, forfaits et factures.', c:'red', ic:'M3 7h18v10H3zM3 11h18' },
    { t:'Mon compte', d:'Créer un compte, mot de passe, notifications.', c:'blue', ic:'M20 21a8 8 0 1 0-16 0M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z' },
  ],
  moniteur: [
    { t:'Devenir moniteur', d:'M\'inscrire, créer mon annonce, fixer mes tarifs.', c:'red', ic:'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM19 8v6M22 11h-6' },
    { t:'Gérer mon planning', d:'Ouvrir des créneaux, gérer et déplacer les réservations.', c:'blue', ic:'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z' },
    { t:'Être payé', d:'Recevoir mes paiements, délais et justificatifs.', c:'red', ic:'M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' },
    { t:'Mon compte moniteur', d:'Profil, vérification, notifications.', c:'blue', ic:'M20 21a8 8 0 1 0-16 0M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z' },
  ]
};

const faqContent = {
  eleve: [
    ['Comment réserver une leçon ?', 'Cherchez un moniteur, ouvrez sa fiche, cliquez sur un créneau vert dans son planning puis confirmez. Vous recevez un rappel avant le rendez-vous.'],
    ['Puis-je annuler ou déplacer ?', 'Oui, jusqu\'à 24 h avant le créneau, directement depuis votre espace, sans frais.'],
    ['Comment se passe le paiement ?', 'Vous payez à l\'heure ou via un forfait. Le paiement est sécurisé et la facture dispo dans votre compte.'],
  ],
  moniteur: [
    ['Comment ouvrir des créneaux ?', 'Depuis votre planning, marquez vos disponibilités en vert. Les élèves ne peuvent réserver que ces créneaux.'],
    ['Quand suis-je payé ?', 'Les paiements sont versés après la leçon, selon le délai indiqué dans votre espace moniteur.'],
    ['Quel statut pour donner des cours ?', 'Vous devez être enseignant de la conduite diplômé. Les justificatifs sont demandés à l\'inscription.'],
  ]
};
