<template>
  <div class="app-layout">
    <VaNavbar class="navbar">
      <template #left>
        <button
          class="mobile-menu-btn"
          aria-label="Toggle navigation menu"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <Icon :icon="isMobileMenuOpen ? 'mdi:close' : 'mdi:menu'" />
        </button>

        <RouterLink
          to="/dashboard"
          class="logo"
        >
          <span class="logo-mark">
            E
          </span>
          EventRide
        </RouterLink>
      </template>

      <template #center>
        <nav class="menu">
          <RouterLink to="/dashboard">
            Dashboard
          </RouterLink>

          <RouterLink to="/events">
            Events
          </RouterLink>

          <RouterLink to="/rides">
            Rides
          </RouterLink>

          <RouterLink
            to="/smart-event"
            class="smart-link"
          >
            Smart Event
            <span class="star">
              ★
            </span>
          </RouterLink>
        </nav>
      </template>

      <template #right>
        <NotificationBell />

        <VaDropdown placement="bottom-end">
          <template #anchor>
            <VaAvatar
              color="primary"
              size="36px"
              class="avatar"
            >
              {{ userInitial }}
            </VaAvatar>
          </template>

          <VaDropdownContent>
            <div class="dropdown">
              <div class="profile">
                <VaAvatar
                  color="primary"
                  size="42px"
                >
                  {{ userInitial }}
                </VaAvatar>

                <div>
                  <strong>
                    {{ user?.name }}
                  </strong>
                  <span>
                    {{ user?.email }}
                  </span>
                </div>
              </div>

              <VaDivider />

              <div class="menu-section">
                <div
                  class="menu-item"
                  @click="router.push('/account')"
                >
                  <Icon icon="mdi:account-circle-outline" />
                  <span>
                    My account
                  </span>
                </div>

                <div
                  class="menu-item"
                  @click="router.push('/my-rides')"
                >
                  <Icon icon="mdi:car-outline" />
                  <span>
                    My rides
                  </span>
                </div>

                <div
                  class="menu-item"
                  @click="router.push('/my-events')"
                >
                  <Icon icon="mdi:calendar-star" />
                  <span>
                    My events
                  </span>
                </div>
              </div>

              <VaDivider />

              <VaButton
                preset="secondary"
                size="small"
                block
                @click="logout"
              >
                Logout
              </VaButton>
            </div>
          </VaDropdownContent>
        </VaDropdown>
      </template>
    </VaNavbar>

    <!-- Mobile Navigation Drawer -->
    <Transition name="fade">
      <div
        v-if="isMobileMenuOpen"
        class="mobile-drawer-backdrop"
        @click="isMobileMenuOpen = false"
      />
    </Transition>

    <Transition name="slide">
      <aside
        v-if="isMobileMenuOpen"
        class="mobile-drawer"
      >
        <div class="drawer-header">
          <RouterLink
            to="/dashboard"
            class="logo"
            @click="isMobileMenuOpen = false"
          >
            <span class="logo-mark">E</span>
            EventRide
          </RouterLink>

          <button
            class="drawer-close-btn"
            aria-label="Zamknij menu"
            @click="isMobileMenuOpen = false"
          >
            <Icon icon="mdi:close" />
          </button>
        </div>

        <nav class="drawer-nav">
          <div class="drawer-section-title">Nawigacja</div>

          <RouterLink
            to="/dashboard"
            class="drawer-link"
            @click="isMobileMenuOpen = false"
          >
            <Icon icon="mdi:view-dashboard-outline" />
            <span>Dashboard</span>
          </RouterLink>

          <RouterLink
            to="/events"
            class="drawer-link"
            @click="isMobileMenuOpen = false"
          >
            <Icon icon="mdi:calendar-text-outline" />
            <span>Events</span>
          </RouterLink>

          <RouterLink
            to="/rides"
            class="drawer-link"
            @click="isMobileMenuOpen = false"
          >
            <Icon icon="mdi:car-multiple" />
            <span>Rides</span>
          </RouterLink>

          <RouterLink
            to="/smart-event"
            class="drawer-link drawer-smart-link"
            @click="isMobileMenuOpen = false"
          >
            <Icon icon="mdi:shield-alert-outline" />
            <span>Smart Event</span>
            <span class="drawer-smart-badge">Nowość ★</span>
          </RouterLink>

          <div class="drawer-section-title drawer-section-spacing">Moje konto</div>

          <RouterLink
            to="/account"
            class="drawer-link"
            @click="isMobileMenuOpen = false"
          >
            <Icon icon="mdi:account-circle-outline" />
            <span>My account</span>
          </RouterLink>

          <RouterLink
            to="/my-rides"
            class="drawer-link"
            @click="isMobileMenuOpen = false"
          >
            <Icon icon="mdi:car-outline" />
            <span>My rides</span>
          </RouterLink>

          <RouterLink
            to="/my-events"
            class="drawer-link"
            @click="isMobileMenuOpen = false"
          >
            <Icon icon="mdi:calendar-star" />
            <span>My events</span>
          </RouterLink>
        </nav>

        <div class="drawer-footer">
          <div class="drawer-user">
            <VaAvatar
              color="primary"
              size="40px"
            >
              {{ userInitial }}
            </VaAvatar>
            <div class="drawer-user-info">
              <div class="drawer-user-name">{{ user?.name || 'Użytkownik' }}</div>
              <div class="drawer-user-email">{{ user?.email }}</div>
            </div>
          </div>

          <VaButton
            preset="secondary"
            size="small"
            block
            @click="logout"
          >
            Logout
          </VaButton>
        </div>
      </aside>
    </Transition>

    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Icon } from "@iconify/vue";
import { useAuthStore } from "@/stores/auth.store";
import NotificationBell from "@/components/notifications/NotificationBell.vue";

const auth = useAuthStore();
const router = useRouter();
const route = useRoute();

const isMobileMenuOpen = ref(false);

// Automatycznie zamykaj menu po zmianie podstrony
watch(
  () => route.path,
  () => {
    isMobileMenuOpen.value = false;
  }
);

const user = computed(() => {
  return auth.user;
});

const userInitial = computed(() => {
  return user.value?.name
    ?.charAt(0)
    ?.toUpperCase();
});

const logout = () => {
  isMobileMenuOpen.value = false;
  router.push("/logout");
};
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  background: #f8fafc;
}

.navbar {
  height: 68px;
  padding: 0 32px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.06);
}

.navbar :deep(.va-navbar__left) {
  display: flex;
  align-items: center;
  gap: 12px;
}

.navbar :deep(.va-navbar__right) {
  display: flex;
  align-items: center;
  gap: 18px;
}

/* Hamburger button */
.mobile-menu-btn {
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 10px;
  background: #f1f5f9;
  color: #334155;
  cursor: pointer;
  font-size: 24px;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.mobile-menu-btn:hover {
  background: #e2e8f0;
  color: var(--va-primary);
}

.mobile-menu-btn:active {
  transform: scale(0.96);
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 21px;
  font-weight: 800;
  letter-spacing: -0.5px;
  color: var(--va-primary);
  text-decoration: none;
}

.logo-mark {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: var(--va-primary);
  color: white;
  font-size: 18px;
  font-weight: 800;
}

.menu {
  display: flex;
  align-items: center;
  gap: 36px;
}

.menu a {
  position: relative;
  color: #64748b;
  text-decoration: none;
  font-size: 15px;
  font-weight: 600;
  transition: 0.25s;
}

.menu a:hover {
  color: var(--va-primary);
}

.menu a.router-link-active {
  color: var(--va-primary);
}

.menu a.router-link-active::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -10px;
  width: 100%;
  height: 3px;
  border-radius: 20px;
  background: var(--va-primary);
}

.smart-link {
  display: flex;
  align-items: center;
  gap: 6px;
}

.star {
  color: #f59e0b;
  font-size: 13px;
  position: relative;
  top: -5px;
}

.avatar {
  cursor: pointer;
  transition: 0.25s;
}

.avatar:hover {
  transform: scale(1.08);
}

.content {
  width: 100%;
  max-width: 1400px;
  margin: auto;
  padding: 32px;
}

.dropdown {
  min-width: 280px;
  padding: 18px;
}

.profile {
  display: flex;
  align-items: center;
  gap: 12px;
}

.profile strong {
  display: block;
  font-size: 15px;
}

.profile span {
  display: block;
  margin-top: 3px;
  font-size: 13px;
  color: #64748b;
}

.menu-section {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 12px 0;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 12px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.2s;
  color: #334155;
  font-weight: 600;
}

.menu-item:hover {
  background: #f1f5f9;
  color: var(--va-primary);
}

.menu-item svg {
  font-size: 22px;
  color: var(--va-primary);
}

.menu-item span {
  font-size: 14px;
}

/* =================================
   MOBILE DRAWER STYLES
==================================== */
.mobile-drawer-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(4px);
  z-index: 9998;
}

.mobile-drawer {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 300px;
  max-width: 85vw;
  background: #ffffff;
  z-index: 9999;
  box-shadow: 6px 0 28px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px;
  border-bottom: 1px solid #f1f5f9;
}

.drawer-close-btn {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #64748b;
  font-size: 20px;
  transition: 0.2s;
}

.drawer-close-btn:hover {
  color: #0f172a;
  background: #e2e8f0;
}

.drawer-nav {
  display: flex;
  flex-direction: column;
  padding: 16px 14px;
  gap: 4px;
}

.drawer-section-title {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: #94a3b8;
  padding: 4px 12px 6px;
}

.drawer-section-spacing {
  margin-top: 14px;
}

.drawer-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 14px;
  border-radius: 10px;
  text-decoration: none;
  color: #334155;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s ease;
}

.drawer-link svg {
  font-size: 22px;
  color: #64748b;
  transition: color 0.2s;
  flex-shrink: 0;
}

.drawer-link:hover {
  background: #f1f5f9;
  color: var(--va-primary);
}

.drawer-link:hover svg {
  color: var(--va-primary);
}

.drawer-link.router-link-active {
  background: rgba(37, 99, 235, 0.09);
  color: var(--va-primary);
}

.drawer-link.router-link-active svg {
  color: var(--va-primary);
}

.drawer-smart-link {
  background: rgba(245, 158, 11, 0.08);
  border: 1px solid rgba(245, 158, 11, 0.25);
}

.drawer-smart-link svg {
  color: #f59e0b;
}

.drawer-smart-badge {
  margin-left: auto;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 12px;
  background: #f59e0b;
  color: white;
}

.drawer-footer {
  margin-top: auto;
  padding: 16px 18px 24px;
  border-top: 1px solid #f1f5f9;
  background: #fafafa;
}

.drawer-user {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}

.drawer-user-info {
  overflow: hidden;
}

.drawer-user-name {
  font-weight: 700;
  font-size: 14px;
  color: #1e293b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.drawer-user-email {
  font-size: 12px;
  color: #64748b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.25s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

/* =================================
   RESPONSIVE BREAKPOINTS
==================================== */
@media (max-width: 900px) {
  .navbar {
    padding: 0 20px;
  }

  .menu {
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .navbar {
    padding: 0 16px;
  }

  .mobile-menu-btn {
    display: flex;
  }

  .logo {
    font-size: 18px;
  }

  .logo-mark {
    width: 28px;
    height: 28px;
    font-size: 16px;
  }

  .menu {
    display: none;
  }

  .content {
    padding: 20px 16px;
  }

  .dropdown {
    min-width: 240px;
  }
}
</style>
