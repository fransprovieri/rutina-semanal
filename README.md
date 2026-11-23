# Rutina semanal

App web (PWA) del desafío de 14 días de Fran y Jazmín: checklist diario por persona, menú de la semana con recetas paso a paso, meal prep del domingo, circuito de fuerza con timer, lista del súper y progreso.

- **Contenido:** todo está en `data.js` (hábitos, menú, recetas, ejercicios, lista del súper). Editá ahí para cambiar platos o cantidades.
- **Datos:** se guardan en el teléfono (localStorage). Cada uno la usa en el suyo.
- **Publicar:** Settings → Pages → Deploy from a branch → `main` / root.
- **En el iPhone:** abrir el link en Safari → Compartir → "Agregar a inicio".
- Si cambiás archivos, subí `VERSION` en `sw.js`.

**Importante para no perder datos:** los datos viven en `localStorage` con la clave `rutina-semanal-v1`. No cambiar esa clave ni el formato sin migrar. En Progreso → Ajustes hay "Guardar copia" / "Restaurar copia".
